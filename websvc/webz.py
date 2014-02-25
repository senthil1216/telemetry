
from flask import Flask, jsonify, render_template, request, session
from gizmo import Gizmo, pigdog

app = Flask(__name__)

@app.route('/')
def index():
   return render_template('index.html')

@app.route('/submit_info',methods=['GET','POST'])
def submit_info():

   if request.method == 'GET':
      return "Go away ... stop poking me!<br> I'm a web-service, try POSTing"

   # get from request
   try:
      payload = request.form['payload']
      p =  pigdog(payload)
      g =  Gizmo(p)
   except KeyError:
      print "error in payload"

   # pass to gizmo
   pass

@app.route('/reports/<report_num>')
def reports(report_num):
   return render_template('reports.html')


if __name__ == '__main__':
    app.run(debug=True)
