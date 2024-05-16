from flask import Flask, render_template, url_for, redirect, request, session, flash,send_from_directory,jsonify
import mysql.connector
import os
from passlib.hash import sha256_crypt
from functools import wraps
from werkzeug.utils import secure_filename
from flask_mysqldb import MySQL
import re 
import socket



# pip install flask
#pip install passlib
# pip install wraps
# pip install mysql-connector

app = Flask(__name__)


     
# connecting to database (xampp)

app.secret_key = 'many random bytes' 

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'motor'

mysql = MySQL(app)
ALLOWED_EXTENSIONS = {
    'jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'tif', 'svg', 'webp', 'ico', 'psd', 'ai', 'eps'
}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS




UPLOAD_FOLDER = 'dynamic/Bike Image'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

path= r'D:\bike_image'
folder_path = r'D:\bike_image'

# mysql = MySQL(app)

def password_validation(pwd):
    password = pwd
    flag = 0
    while True:
        if (len(password) < 8):
            flag = -1
            break
        elif not re.search("[a-z]", password):
            flag = -1
            break
        elif not re.search("[A-Z]", password):
            flag = -1
            break
        elif not re.search("[0-9]", password):
            flag = -1
            break
        elif re.search("\s", password):
            flag = -1
            break
        else:
            flag = 0
            return True
            break

    if flag == -1:
        return False


# def login-rliequired(f)= defining a func 
#@wraps(f)= calling wraps from module

 
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):       #copied from https://pythonprogramming.net/decorator-wrappers-flask-tutorial-login-required/
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            # flash("You need to login first")
            return redirect(url_for('login'))

    return wrap

# @app.route('/home', methods=['GET', 'POST'])

# def home(): 
#     folder_path = r'D:\bike_image'
#     if not os.path.exists(folder_path):
#         os.makedirs(folder_path)
#         return f"The folder '{folder_path}' has been created."
#     else: 

#         videos = os.listdir('E:/server_path') 

#     return render_template("dashboard.html")


#  

@app.route('/')
def index():



    cur = mysql.connection.cursor()
    db = '''CREATE TABLE IF NOT EXISTS payment (
        pid INT PRIMARY KEY AUTO_INCREMENT,
        uid VARCHAR(100),
        bid VARCHAR(100),
        bookid VARCHAR(100),
        transactionid VARCHAR(100),
        cardholder VARCHAR(100),
        cardnumber VARCHAR(100),
        expiry VARCHAR(100),
        cvv VARCHAR(100),
        bike VARCHAR(100),
       
        price VARCHAR(100),
        hour VARCHAR(100),
        status VARCHAR(100)




        )'''

    cur.execute(db)

    book = '''CREATE TABLE IF NOT EXISTS booking (
        id INT PRIMARY KEY AUTO_INCREMENT,
        userid VARCHAR(100),
        bookid VARCHAR(100),
        bikename VARCHAR(100),
        from_date VARCHAR(100),
        to_date VARCHAR(100),
        hour VARCHAR(100),
        rateperhour VARCHAR(100),
        price VARCHAR(100),
        status VARCHAR(100),
        transactionid VARCHAR(100),
        cardholder VARCHAR(100),
        cardnumber VARCHAR(100),
        expiry VARCHAR(100),
        cvv VARCHAR(100)
    )'''

    
    cur.execute(book)

    return render_template('index.html')

@app.route('/Login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM user WHERE username = %s", [username])
        # cur.execute("SELECT * FROM user WHERE password = %s", [password])
        res = cur.fetchone()
        if res:
            pwd = res[3]
            if sha256_crypt.verify(password, pwd):
                session["logged_in"]=True
                session["userId"] = res[0]
                return redirect(url_for('dashboard'))
            else:
                print('wrong password')
        else:
            return redirect(url_for('register'))
    return render_template('login.html')






@app.route('/updateprofile', methods=['POST','GET'])
def updateprofile():
    userId=session["userId"]
    cur = mysql.connection.cursor()
    req = mysql.connection.cursor()
    req.execute("SELECT * FROM user")
    data = req.fetchall()
    req.close()
    # cur.execute("SELECT  * FROM booking WHERE id=%s", [userId])
    if request.method == 'POST':
        name = request.form['fname']
        username = request.form['uname']
        dl = request.form['dl']
        an = request.form['an']
        address = request.form['add']
        city =  request.form['ct']
        state = request.form['st']
        zp =  request.form['zp']

        cur = mysql.connection.cursor()
        
        cur.execute(''' UPDATE user
            SET fullname=%s, username=%s, dl=%s, an=%s,address=%s, city =%s, state=%s, zp=%s WHERE userid=%s''',[name,username,dl,an,address,city,state,zp,userId])
    mysql.connection.commit()
    return render_template('updateprofile.html', data =data)




@app.route('/register', methods=['GET', 'POST'])
def register():

        cur = mysql.connection.cursor()
        quarry= ''' CREATE TABLE IF NOT EXISTS user (
            userid INT PRIMARY KEY AUTO_INCREMENT,
            fullname VARCHAR(255),
            username VARCHAR(255),
            password VARCHAR(255),
            dl VARCHAR(255),
            an VARCHAR(255),
            address VARCHAR(255),
            city VARCHAR(255),
            state VARCHAR(255),
            zp VARCHAR(255)
                )
            '''



        cur.execute(quarry)
      

        if request.method == 'POST':
            fullname = request.form['fullname']
            username = request.form['username']
            dl = request.form['dl']
            an = request.form['an']
            password = sha256_crypt.encrypt(str(request.form['password'])) 
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO user (fullname, username, password,dl,an) VALUES(%s, %s, %s,%s,%s)",[fullname, username, password,dl,an])
            mysql.connection.commit()
            cur.close()
            return redirect(url_for('login'))
        return render_template("Signup.html")

    

@app.route('/admin/bike_profile' , methods=['POST', 'GET'])
def bikeprofile():
    res= mysql.connection.cursor()
    res.execute("SELECT * FROM bikes")
    data = res.fetchall()
    res.close()
    return render_template('bikeform.html', bike=data)







@app.route('/booking', methods=[ 'POST'])
def userbooking():

    if 'userId' not in session:
        return redirect(url_for('login'))
    userId=session["userId"]
    cur = mysql.connection.cursor()

    cur.execute("SELECT  * FROM booking WHERE id=%s", [userId])
    if request.method == "POST":
        # flash("")
        ids = request.form['id']
        bookid=request.form['bookid']
        bikename = request.form['bikename']
        status = request.form['status']
        price = request.form['price']
        from1 = request.form['from']
        to1 = request.form['to']
        hour = request.form['hour']
        rateperhour = request.form['rateperhour']

        

        qur = ''' INSERT INTO booking (id,userid,bookid,bikename,from_date,to_date,hour,rateperhour,price,status)VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) '''
        cur.execute(qur, [ids,userId,bookid,bikename,from1,to1,hour,rateperhour,price,status])

        cur = mysql.connection.cursor()
        mysql.connection.commit()
        cur.close()
        return redirect(url_for('payment', bike = bikename, book = bookid, price = price , ids = ids ,hour = hour))
    
@app.route('/pendingpayment/<pending>', methods=['POST','GET'])
def pendingpayment(pending):
    cur=mysql.connection.cursor()
    cur.execute(" SELECT * FROM booking WHERE bookid=%s",[pending,])
    valu = cur.fetchone()
    cur.close()
    if valu :
        bikename = valu[3]
        bookid = valu[2]
        price = valu[8]
        ids = valu[0]
        hour = valu[6]


    return redirect(url_for('payment', bike = bikename, book = bookid, price = price , ids = ids ,hour = hour ))
    



@app.route('/paymentss' , methods = ['POST','GET'])
def  payments():

    if 'userId' not in session:
        return redirect(url_for('login'))
    userId=session["userId"]
    uid = userId
    book = request.args.get('book')
    cur = mysql.connection.cursor()
    res = mysql.connection.cursor()
    req = mysql.connection.cursor()
    req.execute("SELECT * FROM booking WHERE bookid = %s ", [book])
    cur.execute("SELECT  * FROM payment WHERE uid=%s", [uid])
    res.execute("SELECT * FROM user WHERE userid = %s " ,[userId])
    books =req.fetchone()
    data = res.fetchall()
    res.close()
    req.close()
    
    if books:   
        ids = books[0]
            
        
        bike = request.args.get('bike')
        
        price = request.args.get('price')
        hour = request.args.get('hour')
        
    if request.method == 'POST':
        pid = request.form['pid']
        transactionid = request.form['transactionid']
        cardholder = request.form['cardholder']
        cardnumber = request.form['cardnumber']
        expiry = request.form['expiry']
        cvv = request.form['cvv']
        ids = request.form['ids']
        bike = request.form['bike']
        book = request.form['book']
        price = request.form['price']
        hour = request.form['hour']
        statuss = request.form['status']

        db = '''CREATE TABLE IF NOT EXISTS payment (
        pid INT PRIMARY KEY AUTO_INCREMENT,
        uid VARCHAR(100),
        bookid VARCHAR(100),
        transactionid VARCHAR(100),
        cardholder VARCHAR(100),
        cardnumber VARCHAR(100),
        expiry VARCHAR(100),
        cvv VARCHAR(100),
        bike VARCHAR(100),
       
        price VARCHAR(100),
        hour VARCHAR(100),
        status VARCHAR(100)




        )'''

        booked = ''' UPDATE booking
            SET status=%s, transactionid=%s, cardholder=%s, cardnumber=%s, expiry=%s , cvv=%s WHERE bookid=%s'''
        cur.execute(booked, [statuss,transactionid,cardholder,cardnumber,expiry,cvv,book])

        mysql.connection.commit()

        payment=''' INSERT INTO payment VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        
        '''

        # cur.execute(qur, [ids,userId,bookid,bikename,from1,to1,hour,rateperhour,price,status])

        cur.execute(payment, [pid, userId,ids,book,transactionid,cardholder,cardnumber,expiry,cvv,bike,price,hour,statuss])
        mysql.connection.commit()
        cur.close()
       

        
        
        data = res.fetchall()
        res.close()
        
        return redirect(url_for('booked' , bikee = bike, price = price, tid = transactionid , book = book ))



    return render_template('payments.html',data = data, ida = ids, book = book, bike = bike , price = price, hour = hour  )


@app.route('/payments', methods=['POST', 'GET'])
def payment():
    if 'userId' not in session:
        return redirect(url_for('login'))

    userId = session["userId"]
    book_id = request.args.get('book')
    book = request.args.get('book')
    cur = mysql.connection.cursor()

    # Fetch booking details
    cur.execute("SELECT * FROM booking WHERE bookid = %s", [book_id])
    booking_details = cur.fetchone()

    # Fetch user payment data
    cur.execute("SELECT * FROM payment WHERE uid=%s", [userId])
    payment_data = cur.fetchall()

    # Fetch user data
    cur.execute("SELECT * FROM user WHERE userid = %s", [userId])
    user_data = cur.fetchall()

    # Close cursor for select queries
    cur.close()

    if booking_details:
        ids = book[0]
        bike = request.args.get('bike')
        price = request.args.get('price')
        hour = request.args.get('hour')

    if request.method == 'POST':
        pid = request.form['pid']
        transactionid = request.form['transactionid']
        cardholder = request.form['cardholder']
        cardnumber = request.form['cardnumber']
        expiry = request.form['expiry']
        cvv = request.form['cvv']
        ids = request.form['ids']
        bike = request.form['bike']
        book = request.form['book']
        price = request.form['price']
        hour = request.form['hour']
        status = request.form['status']

        cur = mysql.connection.cursor()

        create_payment_table = '''
            CREATE TABLE IF NOT EXISTS payment (
                pid INT PRIMARY KEY AUTO_INCREMENT,
                uid VARCHAR(100),
                bookid VARCHAR(100),
                transactionid VARCHAR(100),
                cardholder VARCHAR(100),
                cardnumber VARCHAR(100),
                expiry VARCHAR(100),
                cvv VARCHAR(100),
                bike VARCHAR(100),
                price VARCHAR(100),
                hour VARCHAR(100),
                status VARCHAR(100)
            )
        '''
        cur.execute(create_payment_table)

        update_booking = '''
            UPDATE booking
            SET status=%s, transactionid=%s, cardholder=%s, cardnumber=%s, expiry=%s, cvv=%s
            WHERE bookid=%s
        '''
        cur.execute(update_booking, [status, transactionid, cardholder, cardnumber, expiry, cvv, book])

        insert_payment = '''
            INSERT INTO payment (pid, uid, bookid, transactionid, cardholder, cardnumber, expiry, cvv, bike, price, hour, status)
            VALUES (NULL, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        '''
        cur.execute(insert_payment, [userId, ids, transactionid, cardholder, cardnumber, expiry, cvv, bike, price, hour, status])

        mysql.connection.commit()
        cur.close()

        return redirect(url_for('booked', bikee=bike, price=price, tid=transactionid, book=book))

    return render_template('payments.html', data=user_data, ida=ids, book=book_id, bike=bike, price=price, hour=hour)


@app.route('/booked')
@login_required
def booked():
    bike = request.args.get('bikee')
    price = request.args.get('price')
    tid = request.args.get('tid')
    book = request.args.get('book')
    cur = mysql.connection.cursor()
    





    return render_template('done.html',bike=bike,price=price,tid=tid,book=book)







@app.route('/invoice', methods=['POST','GET'])
@login_required
def invoice():

    # book = request.args.get('bikee')
    book = request.args.get('book')
    bike = request.args.get('bike')

    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM booking WHERE bookid=%s', [book,])
    data= cur.fetchall()
    cur.close()

    res = mysql.connection.cursor()
    res.execute('SELECT * FROM bikes WHERE name=%s ', [bike,])
    bikes = res.fetchall()
    
    res.close()

        
    return render_template('invoice.html' , data=data,bike=bikes)







@app.route('/adminreg', methods=['GET', 'POST'])
def adminreg():

                
    quarry='''CREATE TABLE IF NOT EXISTS admin(
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    admin VARCHAR(100),
    password VARCHAR(100) )'''

    res = mysql.connection.cursor()
    res.execute(quarry)

    if request.method == 'POST':
        # fullname = request.form['fullname']
        admin = request.form['admin']
        password = sha256_crypt.encrypt(str(request.form['password'])) 
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO admin ( admin, password) VALUES( %s, %s)", [
                      admin, password])
        mysql.connection.commit()
        cur.close()
        flash('Congratulation Your Account is Created !')
        return redirect(url_for('adminlogin'))
    return render_template('adminreg.html')






@app.route('/admin' ,  methods=["GET", "POST"])
def adminlogin():

    if request.method == 'POST':
        admin = request.form['admin']
        password = request.form['password']
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM admin WHERE admin = %s", [admin])
        # cur.execute("SELECT * FROM user WHERE password = %s", [password])
        res = cur.fetchone()
        if res:
            pwd = res[2]
            if sha256_crypt.verify(password, pwd):
                
                session["logged_in"]=True
                return redirect(url_for('adminmain'))
            else:
                flash('You have Entered A Wrong Password, Try again')
                return redirect(url_for('adminlogin'))
        else:
                flash('This User not Found ')
                flash('To Create Account Click on Sign Up button')
                return redirect(url_for('adminlogin'))
        # else:
    return render_template('adminlogin.html')




@app.route('/adminmain')

def adminmain():
    return render_template("adminmain.html")


@app.route("/userdetails" , methods = ['GET', 'POST'])
@login_required
def userdetails():
    cur = mysql.connection.cursor()
    cur.execute("SELECT  * FROM user ")
   
    data = cur.fetchall()
    cur.close()
    return render_template('userdetails.html', user= data)



@app.route('/deleteuser/<string:id_data>', methods = ['GET', 'POST'])
def deleteuser(id_data):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM user WHERE userid =%s", (id_data,))
    mysql.connection.commit()
    flash("User Has Been Deleted Successfully")
    return redirect(url_for('userdetails'))


@app.route('/deletebooking/<string:bookid_data>', methods = ['GET', 'POST'])
def deletebooking(bookid_data):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM booking WHERE id =%s", (bookid_data,))
    cur.execute("DELETE FROM payment WHERE bid=%s", (bookid_data,))
    mysql.connection.commit()
    flash("User Has Been Deleted Successfully")
    return redirect(url_for('mybookings'))

@app.route('/deletebookings/<string:bookid_datas>', methods = ['GET', 'POST'])
def deleteuserbookings(bookid_datas):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM booking WHERE id =%s", (bookid_datas,))
    cur.execute("DELETE FROM payment WHERE bid=%s", (bookid_datas,))

    mysql.connection.commit()
    flash("User Has Been Deleted Successfully")
    return redirect(url_for('adminuserbooking'))







@app.route('/adminuserbooking')
@login_required
def adminuserbooking():

    cur = mysql.connection.cursor()
    cur.execute("SELECT  * FROM booking ")
    data = cur.fetchall()
    cur.close()
    return render_template("adminuserbooking.html", data=data)





@app.route('/home' , methods =['POST','GET'])
def dashboard():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM bikes ")
    data = cur.fetchall()
    

   

       
    
    for x in data:

        if request.method == 'POST':
           selected = request.form['select']
            
        
        #    if selected == x[11]:
           if selected =='':
            cur.execute("SELECT * FROM bikes ")
            data = cur.fetchall()
            
           elif selected :
            res = mysql.connection.cursor()
            res.execute("SELECT * FROM bikes WHERE bs1 = %s ", [selected])
            data = res.fetchall() 

            cur.close()
            res.close()

           
           





    return render_template('dashboard.html', data = data )







@app.route('/landingpage/<content>' , methods= ['GET','POST'])
def weel(content):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM bikes WHERE name =%s', (content,))
    select = cur.fetchall()
    return render_template('bikelanding.html', bike = select)





@app.route('/admin/bike_addup' )
def form():
        
            # number = request.args.get('number')

            # # Perform the database query
            # cur = mysql.connection.cursor()
            # cur.execute("SELECT bike_id FROM bikes WHERE bike_id = %s", (number,))
            # result = cur.fetchone()
            # cur.close()
        
            # if result:
            # # Number exists in the database
            #     return jsonify({'exists': True})
            # else:
            # # Number does not exist in the database
            #     return jsonify({'exists': False})
        
    
    return render_template('form.html')


@app.route('/upload', methods=['POST'])
def upload():
    cursor = mysql.connection.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS bikes (
            id INT PRIMARY KEY AUTO_INCREMENT,
            bike_id INT,
            name VARCHAR(255),
            filename VARCHAR(255),
            bike_type VARCHAR(255),
            availability VARCHAR(255),
            rate DECIMAL(10, 2),
            fuel_type VARCHAR(255),
            bike_cc INT,
            description TEXT,
            model VARCHAR(255),
            bs1 VARCHAR(255),
            bs2 VARCHAR(255),
            bs3 VARCHAR(255),
            bs4 VARCHAR(255),
            bs5 VARCHAR(255)
        )
    ''')

    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    if request.method == 'POST':
        bike_id = request.form['unique_id']
        image = request.files['image']
        name = request.form['name']
        bike_type = request.form['types']
        availability = request.form['availability']
        rate = request.form['rate']
        fuel_type = request.form['fueltype']
        bike_cc = request.form['bike_cc']
        description = request.form['desc']
        model = request.form['model']
        bs1 = request.form['bs1']
        bs2 = request.form['bs2']
        bs3 = request.form['bs3']
        bs4 = request.form['bs4']
        bs5 = request.form['bs5']

    # Save the image to the upload folder
        filename = image.filename
        image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    # Insert the image details into the database
        cursor = mysql.connection.cursor()
        query = "INSERT INTO bikes (bike_id, name, filename, bike_type, availability, rate, fuel_type, bike_cc, description, model, bs1, bs2, bs3, bs4, bs5) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(query, (bike_id, name, filename, bike_type, availability, rate, fuel_type, bike_cc, description, model, bs1, bs2, bs3, bs4, bs5))
        mysql.connection.commit()

        
    return redirect(url_for('bikeprofile'))



# @app.route('/random_number' , methods=['POST','GET'])
# def random():
    
    


@app.route('/mybookings')
@login_required
def mybookings():
    userId=session["userId"]
    cur = mysql.connection.cursor()
    cur.execute("SELECT  * FROM booking WHERE userid=%s", [userId])
    datas = cur.fetchall()
    cur.close()
    return render_template("mybookings.html", data=datas)



@app.route('/home/bike')
# @login_required 
def bikeselect():


    filename = request.args.get('filename')
    
    cur= mysql.connection.cursor()
    cur.execute('SELECT * FROM bikes')
    data = cur.fetchall()
    cur.close()
    # userId=session["userId"]
    # cur = mysql.connection.cursor()bikes
    # cur.execute("SELECT  * FROM booking ")

    # cur.close()
    return render_template('bikelanding.html', data=data)


@app.route('/paymentlist' , methods=["GET", "POST"])
@login_required
def paymentlist():
    
    userId=session["userId"]
    # bookingid=session["bookingid"]
    cur = mysql.connection.cursor()
    cur.execute("SELECT  * FROM booking WHERE id=%s", [userId])
    # cur.execute("SELECT * FROM booking WHERE booking_id=%s", [bookingid])
     
    data = cur.fetchall()
    cur.close()
    return render_template('payment.html', booking = data)




@app.route('/updatebooking',methods=['POST','GET'])
def updatebooking():
    userId=session["userId"]
    cur = mysql.connection.cursor()
    cur.execute("SELECT  * FROM booking WHERE id=%s", [userId])
    if request.method == 'POST':
        booking_id_data = request.form['booking_id']
        status = request.form['status']
        fullname = request.form['fullname']
        email= request.form['email']
        address = request.form['address']
        city = request.form['city']
        state = request.form['state']
        zip = request.form['zip']
        cardname = request.form['cardname']
        cardnumber = request.form['cardnumber']
        expmonth = request.form['expmonth']
        expyear = request.form['expyear']
        cvv = request.form['cvv']
        sameadr = request.form['sameadr']
        cur = mysql.connection.cursor()
        cur.execute("""
               UPDATE booking
               SET status=%s , fullname=%s, email=%s, address=%s, city=%s , state=%s , zip=%s , cardname=%s , cardnumber=%s , expmonth=%s , expyear=%s , cvv=%s , sameadr=%s
               WHERE booking_id=%s
               """, (status,  fullname, email, address, city, state, zip, cardname, cardnumber, expmonth, expyear, cvv, sameadr, booking_id_data))
        flash("Data Updated Successfully")
        mysql.connection.commit()
        return redirect(url_for('confirmation'))




# @app.route('/admin/addbike_profile', methods=['POST', 'GET'])
# def create():
#     return render_template("bikeform.html")



@app.route('/delete_bikeprofile/<data>' , methods=['POST','GET'])
def deletebike(data):
    cur = mysql.connection.cursor()
    quarry =''' SELECT * FROM bikes WHERE id =%s '''
    dqur = '''DELETE FROM bikes WHERE id=%s'''
    cur.execute(quarry,(data,)) 
    delete = cur.fetchone()

    img = delete[3]

    if img:
        os.remove(os.path.join(app.config['UPLOAD_FOLDER'],img))
        cur.execute(dqur,(data,))
    mysql.connection.commit()
    cur.close()
    return redirect(url_for('bikeprofile'))



@app.route('/delete_bikeprofile/<data>' , methods=['POST','GET'])
def updatebike(data):
    cur = mysql.connection.cursor()
    quarry =''' SELECT * FROM bikes WHERE id =%s '''
    dqur = '''UPDA FROM bikes WHERE id=%s'''
    cur.execute(quarry,(data,)) 
    delete = cur.fetchone()

    img = delete[3]

    if img:
        os.remove(os.path.join(app.config['UPLOAD_FOLDER'],img))
        cur.execute(dqur,(data,))
    mysql.connection.commit()
    cur.close()
    return redirect(url_for('bikeprofile'))







@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)




@app.route("/logout", methods=["GET", "POST"])
@login_required 
def logout():

    session.clear()
    return redirect(url_for("index"))

def get_wireless_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    ip_address = s.getsockname()[0]
    s.close()
    return ip_address

if __name__ == '__main__':
    app.secret_key="123"
    # h='192.168.29.17'
    wireless_ip = get_wireless_ip()
    host= wireless_ip
    # host='192.168.29.17'
    port='8000'

    app.run(host=host, port=port, debug=True)




