from flask import Flask,request, render_template, redirect, url_for,jsonify
from werkzeug.utils import secure_filename
import mysql.connector
import os
from flask import send_from_directory
import requests
import json

#檔案儲存的位置、設定檔案類型
UPLOAD_FOLDER = 'new'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])


app = Flask(__name__)     # 建立 app 變數為 Flask 物件，__name__ 表示目前執行的程式
# 設定上傳檔案的位置大小
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB

# 資料庫連接設定
db_config = {
    'host': 'localhost',  # MySQL 資料庫伺服器的地址
    'user': 'root',       # MySQL 用戶名稱
    'password': 'password',  # MySQL 密碼
    'database': 'trash_v3'  # 資料庫名稱
}

with open('config.json') as config_file:
    config = json.load(config_file)
print(config)




# 建立 MySQL 連接
def get_db_connection():
    conn = mysql.connector.connect(**db_config)
    if conn.is_connected():
            print("成功連接到資料庫")
    else:
            print("無法連接到資料庫")
    return conn


# 檢查檔案格式是否允許
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def bin2():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)  # 使用 dictionary 模式，返回的是字典格式的資料
    cursor.execute("select distinct(trash_loc) as 'bins' from trash_box;") # 替換為你的資料表名稱
    # cursor.execute("select concat(bin_name,'-',trash_loc) as 'bin_name' from trash_box;") # 替換為你的資料表名稱
    bin = cursor.fetchall()# 獲取所有資料行
    cursor.close()
    conn.close()
    return bin

def time1(rows1=None):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    if rows1:
        cursor.execute(f'select identify_time from trash_box i1 join sensor s1 on i1.bin_id = s1.trash_box_bin_id where i1.trash_loc="{rows1}" order by identify_time limit 1;')
    else:
        cursor.execute('select * from sensor;')
    rows2 = cursor.fetchall()
    print(rows2)
    cursor.close()
    conn.close()
    return rows2


def time2(rows1=None):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    if rows1:
        cursor.execute(f'select *,concat(bin_name,"-",trash_loc) as "bins" from trash_box i1 join sensor s1 on i1.bin_id = s1.trash_box_bin_id where i1.trash_loc="{rows1}";')
    else:
        cursor.execute('select * from sensor;')
    rows2 = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows2



def state(rows1=None,rows2=None):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    if rows1:
        print("ok")
        cursor.execute("select results from trash_box i1 join sensor s1 on i1.bin_id = s1.trash_box_bin_id where trash_loc=%s and (identify_time = %s or identify_time < %s) and bin_name='一般垃圾' order by identify_time limit 1;",(rows1,rows2,rows2))
        others = cursor.fetchall()
        cursor.execute("select results from trash_box i1 join sensor s1 on i1.bin_id = s1.trash_box_bin_id where trash_loc=%s and (identify_time = %s or identify_time < %s) and bin_name='資源回收' order by identify_time limit 1;",(rows1,rows2,rows2))
        recycle = cursor.fetchall()
        
    cursor.close()
    conn.close()
    return others,recycle
    


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/phone_upload.html')
def phone_upload():
    return render_template('phone_upload.html')

@app.route('/phone_result.html')
def phone_result():
    return render_template('phone_result.html')

@app.route('/analyze1.html')
def analyze1():
    return render_template('analyze1.html')

@app.route('/analyze2.html')
def analyze2():
    return render_template('analyze2.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)