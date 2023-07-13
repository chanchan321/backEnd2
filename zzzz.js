const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const filesPayloadExists = require('./middleware/filesPayloadExists');
const fileExtLimiter = require('./middleware/fileExtLimiter');
const fileSizeLimiter = require('./middleware/fileSizeLimiter');

const xlsx = require('xlsx');
const mysql = require("mysql");
const crypto = require("crypto");

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'dbtesting'
});

const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const fs = require('fs')
const PORT =  3100;
const app = express();

const Importer = require('mysql-import');


app.use(cors(corsOptions));

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "index.html"));
// });

app.use('/backUPrestore',fileUpload({ createParentPath: true }), require('./routes/backUPrestore'));

app.use('/img/:pisID/:imgName', (req, res, next) => {
    const pisID = req.params.pisID
    const imgName = req.params.imgName
        express.static(__dirname+'/students/'+pisID+'/'+imgName)(req, res, next);
  });

app.delete('/img/delete/:pisID/:imgDel/:saveDB', (req, res) => {
    // console.log(req.params.pisID)
    // console.log(req.params.imgDel)
    //  console.log(req.params.saveDB)
    const deletethis = (JSON.parse(req.params.imgDel)[0])
    const status = JSON.parse(req.params.saveDB).length >= 3? 'complete':'incomplete'
    console.log(status)
    const sqlUpdateHOMES= `UPDATE piscontent Set homeSketch = ?, statusComp = ? WHERE pisID = ?`
    db.query(sqlUpdateHOMES,[req.params.saveDB,status,req.params.pisID],(err,result)=>{

        fs.unlinkSync(__dirname+'/students/'+req.params.pisID+'/'+deletethis, (err => {
        if (err) return console.log(err);
                
        }))
        res.send(result)

        // res.send(result)
        // console.log(result)
        // console.log(err)
    })
    
});

app.post('/upload/:lrn/:arr',
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter(['.png', '.jpg', '.jpeg', '.xlsx']),
    fileSizeLimiter,
    (req, res) => {
        const files = req.files
        // console.log(req.files)
        const piisID =req.params.lrn
        // console.log(JSON.parse(req.params.arr))
        let nameofFile=[]
        const filename = crypto.randomBytes(8).toString("hex");

        const homeS = JSON.parse(req.params.arr)
      
        Object.keys(files).forEach(key => {
            nameofFile.push(files[key].name)
            // console.log(nameofFile)
            // console.log((nameofFile[0].split('.')).slice(-1)[0])
            // const filepath = path.join( files[key].name)
            // const filepath = path.join( __dirname,files[key].name)
            const filepath = path.join(__dirname,'students', req.params.lrn ,filename+'.'+(nameofFile[0].split('.')).slice(-1)[0])
            files[key].mv(filepath, (err) => {
                if (err) return res.status(500).json({ status: "error", message: err })
            })
        })

        homeS.push(filename+'.'+(nameofFile[0].split('.')).slice(-1)[0])
        const todaydate = new Date();
            var dd = todaydate.getDate();
            var mm = todaydate.getMonth()+1; 
            var yyyy = todaydate.getFullYear();

            if(dd<10) {dd='0'+dd} 
            if(mm<10) { mm='0'+mm} 
            console.log(`${yyyy}-${mm}-${dd}`)
        // console.log(homeS)
        // console.log(homeS.length)
        const status= homeS.length > 3? 'complete': 'incomplete'
        const dateComplete= status === 'complete'? `${yyyy}-${mm}-${dd}`: ''
        const sqlGET= `UPDATE piscontent SET homeSketch = ?, statusComp = ?, dateComplete = ? where pisID = ?`
            db.query(sqlGET,[JSON.stringify(homeS),status,dateComplete,piisID] ,(err,result)=>{
                 if(err) return res.sendStatus(500)
                 console.log(result)
                 return res.json({ status: 'success', message: Object.keys(files).toString() })
        })  

        
    }
)


app.post('/upload',
fileUpload({ createParentPath: true }),
    (req, res) => {
        const files = req.files
         
        console.log(files)
        Object.keys(files).forEach(key => {
            console.log(files[key])
            const filepath = path.join(__dirname,'Restore.sql')
            files[key].mv(filepath, (err) => {
                if (err) return res.status(500).json({ status: "error", message: err })
            })
        })

         setTimeout(()=>{
             deletess();
         },2000)
        
     
          function deletess()  {
             var del = mysql.createConnection({
                     host: "localhost",
                     user: "root",
                     password: "",
                     database: "dbtesting"
                 });
     
     
             del.connect(function(err) {
             if (err) throw err;
             var sql = "DROP DATABASE dbtesting";
             del.query(sql, function (err, result) {
               if (err) throw err;
               console.log('wait to delete')
               if(result) return createzz()
             })
           })
           
         }
     
           
           function createzz() {
     
                 var cre = mysql.createConnection({
                         host: "localhost",
                         user: "root",
                         password: ""
                     });
     
             cre.connect(function(err) {
             if (err) throw err;
             console.log("Connected!");
             cre.query("CREATE DATABASE dbtesting", function (err, result) {
               if (err) throw err;
               console.log('wait to create')
               if(result) return importz()
               
              

             })
           })
           }
     
         
       
         function importz() {
     
               const host = 'localhost';
                 const user = 'root';
                 const password = '';
                 const database = 'dbtesting';
                 
                 const importer = new Importer({host, user, password, database});
                     
                     importer.onProgress(progress=>{
                     var percent = Math.floor(progress.bytes_processed / progress.total_bytes * 10000) / 100;
                     console.log(`${percent}% Completed`);
                     });
                     
                    //  importer.import('./Restore.sql').then(()=>{
                    //  var files_imported = importer.getImported();
                    // //  console.log(`${files_imported.length} SQL file(s) imported.`);

                    importer.import('./Restore.sql').then(()=>{
                        
                        var files_imported = importer.getImported();
                        console.log(`${files_imported.length} SQL file(s) imported.`);

                     fs.unlinkSync('Restore.sql', (err => {
                        if (err) return console.log(err);
                        
                        }))
                    console.log('wait to insert')

                        res.sendStatus(200)   
                     }).catch(err=>{
                     console.error(err);
                     })
         }

    }
)


const db2 = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'dbtestings'
});


app.post('/uploadExcel',
fileUpload({ createParentPath: true }),
    (req, res) => {
        const files = req.files


                Object.keys(files).forEach(key => {
                    // console.log(files[key])
                    const filepath = path.join('students.xlsx')

                    files[key].mv(filepath, (err) => {
                        if (err) return res.status(500).json({ status: "error", message: err })
                        // let data = []
                                try{

                                
                                const workbook = xlsx.readFile('students.xlsx')
                               
                                  for(let indexZ = 0 ; indexZ <= workbook.SheetNames.length-1; indexZ++){
                                //     console.log(workbook.SheetNames[indexZ])

                                const worksheet = workbook.Sheets[workbook.SheetNames[indexZ]]
                                // console.log(workbook.SheetNames)
                                // console.log(workbook.SheetNames.length-1 )

                              
                                const range = xlsx.utils.decode_range(worksheet["!ref"])
                                    
                                        for(let row = range.s.r + 1 ; row <= range.e.r; row++){

                                             let data = []
                                                for(let col = range.s.c; col<=range.e.c; col++){
                                                    let cell = worksheet[xlsx.utils.encode_cell({r:row,c:col})]
                                                    data.push(cell.v)
                                                }
                                                console.log(workbook.SheetNames[indexZ])
                                                console.log(...data,workbook.SheetNames[indexZ])
                                              console.log(data)
                                              let sql = `INSERT INTO students (LRN, lastname, firstname, middlename,grade) VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE grade = ?` 

                                              db2.query(sql,[...data,workbook.SheetNames[indexZ],workbook.SheetNames[indexZ]],(err,results,fields)=>{
                                                      if(err) return console.log(err.message)

                                                    //   console.log(results)
                                              })
                                            //   let sql = `INSERT INTO students (LRN, lastname, firstname, middlename,grade) VALUES (?,?,?,?,?)` 

                                            //                 db2.query(sql,[...data,12],(err,results,fields)=>{
                                            //                         if(err) return console.log(err.message)

                                            //                         console.log(results)
                                            //                 })

                                        }

                                            //   let sql = `INSERT INTO students (LRN, lastname, firstname, middlename,grade) VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE grade = ${workbook.SheetNames[indexZ]}` 

                                            //                 db2.query(sql,[...data,workbook.SheetNames[indexZ]],(err,results,fields)=>{
                                            //                         if(err) return console.log(err.message)

                                            //                         console.log(results)
                                            //                 })
                                            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                                                // let sql = `INSERT INTO students (LRN, lastname, firstname, middlename , grade) VALUES (${data})` 

                                                //             db2.query(sql,(err,results,fields)=>{
                                                //                     if(err) return console.log(err.message)

                                                //                     console.log(results)
                                                //             })
                                    }         

                                fs.unlinkSync('students.xlsx', (err => {
                                    if (err) return console.log(err);
                                    }))
                                
                                res.sendStatus(200)
                            
                            }catch(err){
                                console.log({erxror:err})

                                fs.unlinkSync('students.xlsx', (err => { 
                                    if (err) return console.log(err) 
                                }))

                                res.sendStatus(500)
                    
                                }

            
            })

         }
        )

    }
)
    


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));