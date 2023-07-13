const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const filesPayloadExists = require('./middleware/filesPayloadExists');
const fileExtLimiter = require('./middleware/fileExtLimiter');
const fileSizeLimiter = require('./middleware/fileSizeLimiter');

const bcrypt = require('bcrypt');

const xlsx = require('xlsx');
const mysql = require("mysql");
const crypto = require("crypto");

const db = mysql.createConnection({
    host:'db4free.net',
    user:'capstone321',
    password:'CHANCHANchan123',
    database:'dbtesting321'
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



///insert HOMESKETCH
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
        const status= homeS.length > 2 ? 'complete': 'incomplete'
        const dateComplete= status === 'complete'? `${yyyy}-${mm}-${dd}`: ''
        const sqlGET= `UPDATE piscontent SET homeSketch = ?, statusComp = ?, dateComplete = ? where pisID = ?`
            db.query(sqlGET,[JSON.stringify(homeS),status,dateComplete,piisID] ,(err,result)=>{
                 if(err) return res.sendStatus(500)
                 console.log(result)
                 return res.json({ status: 'success', message: Object.keys(files).toString() })
        })  

        
    }
)
//////////////////////////////////////////////////////////////////////////
///restore
app.post('/upload',
fileUpload({ createParentPath: true }),
fileExtLimiter(['.sql']),
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
                    host:'db4free.net',
                    user:'capstone321',
                    password:'CHANCHANchan123',
                    database:'dbtesting321'
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
                    host:'db4free.net',
                    user:'capstone321',
                    password:'CHANCHANchan123',
                    database:'dbtesting321'
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
     
               const host = 'db4free.net';
                 const user = 'capstone321';
                 const password = 'CHANCHANchan123';
                 const database = 'dbtesting321';
                 
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

////////////////////////insert excel
const db2 = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'dbtestings'
});


app.post('/uploadExcel',
fileUpload({ createParentPath: true }),
fileExtLimiter(['.xlsx']),
    async (req, res) => {
        const files = req.files

        const hashed = await bcrypt.hash('1', 10)
       


                Object.keys(files).forEach(key => {
                    // console.log(files[key])
                    const filepath = path.join('students.xlsx')

                    files[key].mv(filepath, (err) => {
                        if (err) return res.status(500).json({ status: "error", message: err })
                                try{

                                
                                const workbook = xlsx.readFile('students.xlsx')
                               
                                  for(let indexZ = 0 ; indexZ <= workbook.SheetNames.length-1; indexZ++){

                                const worksheet = workbook.Sheets[workbook.SheetNames[indexZ]]

                              
                                const range = xlsx.utils.decode_range(worksheet["!ref"])
                                    
                                        for(let row = range.s.r + 1 ; row <= range.e.r; row++){  

                                            let data = []  
                                                
                                            try{
                                             
                                                for(let col = range.s.c; col<=range.e.c; col++){
                                                    let cell = worksheet[xlsx.utils.encode_cell({r:row,c:col})]
                                                    data.push(cell.v)
                                                }
                                            }catch(err){
                                                console.log({eeXrorr:err})
                                                fs.unlinkSync('students.xlsx', (err => { 
                                                    if (err) return console.log(err) 
                                                }))
                
                                               return res.sendStatus(500)
                                            }

                                                // console.log({accountID:crypto.randomBytes(14).toString("hex")})
                                                // console.log({pisID:crypto.randomBytes(8).toString("hex")})
                                                // console.log({lrn:data[0]})
                                                // console.log({grade:workbook.SheetNames[indexZ]})
                                                // console.log({lastname:data[1]})
                                                // console.log({firstname:data[2]})
                                                // console.log({middlename:data[3]})
                                                // console.log(hashed)
                                                // console.log([...data,workbook.SheetNames[indexZ]])

                                                const accountID = crypto.randomBytes(14).toString("hex")
                                                const pisID = data[0]+'PIS'
                                                const lrn = data[0]
                                                const lastname = data[1]
                                                const firstname = data[2]
                                                const middlename = data[3]
                                                const grade = workbook.SheetNames[indexZ]
                                               

                                                
                                        const personalBG = {
                                                    lrn:lrn,
                                                    lastname:lastname,
                                                    firstname:firstname,
                                                    middlename:middlename,
                                                    age:'',
                                                    dateOfBirth:'',
                                                    placeOfBirth:'',
                                                    gender:'',
                                                    birthAmongSib:'',
                                                    citizenship:' ',
                                                    religion:'',
                                                    civilStatus:'',
                                                    currentAddress:'',
                                                    permanentAddress:'',
                                                    landline:'',
                                                    cellphoneNo:'',
                                                    eMail:'',
                                                    languageSpoken:''
                                        }
                                        const familyBG ={
                                            father :
                                            {
                                                  status:'',
                                                  name:' ',
                                                  age:'',
                                                  religion:'',
                                                  nationality:'',
                                                  educationalAttainment:'',
                                                  occupation:'  ',
                                                  positionEmployer:'',
                                                  officeBusinessAddress:'',
                                                  contactNumber:''
                                              },
                                              mother :
                                              {
                                                    status:'',
                                                    name:' ',
                                                    age:'',
                                                    religion:'',
                                                    nationality:'',
                                                    educationalAttainment:'',
                                                    occupation:'  ',
                                                    positionEmployer:'',
                                                    officeBusinessAddress:'',
                                                    contactNumber:''
                                                },
                                            guardian:
                                                  {
                                            relationshipW:'',
                                            name:' ',
                                            age:'',
                                            religion:'',
                                            nationality:'',
                                            educationalAttainment:'',
                                            occupation:'  ',
                                            positionEmployer:'',
                                            officeBusinessAddress:'',
                                            contactNumber:'',
                                            monthStayed:''
                                        }
                                        }
                                        const newMaritalStatus = {
                                        married:'',
                                        livingTogether:'',
                                        singleParent:false,
                                        widow:'',
                                        temporarySeperated:'',
                                        permanentlySeperated:'',
                                        marriedAnnulled:'',
                                        fatherOfw:'',
                                        motherOfw:'',
                                        fatherWpartner:'',
                                        motherWpartner:''
                                        }
                                        const educbg2= {
                                            subjectWithLowestGrade:'',
                                            subjectWithHighestGrade:'',
                                            awards:'',
                                            newscholarship:{
                                                fourpis:false,
                                                cibi:false,
                                                sistersCharity:false,
                                                others:''
                                                }
                                        }
                                        const unique = {
                                            friendsInschool:'',
                                            outsideInschool:'',
                                            specialInterest:'',
                                            hobbies:'',
                                            characteristicsThatDescibeU:'',
                                            presentFears:'',
                                            disabilities:'',
                                            chronicIllness:'',
                                            medicinesRegTaken:'',
                                            accidentsExperienced:'',
                                            operationsExp:'',
                                            immunizations:'',
                                    
                                            consultedPsy:'',
                                            howmanysessionPsy:'',
                                            forwhatPsy:'',
                                    
                                            consultedCoun:'',
                                            howmanysessionCoun:'',
                                            forwhatCoun:'',
                                    
                                            emerContact:'',
                                            address:'',
                                            contactNumber:'',
                                    
                                        }

                                        const sqlregStud= `INSERT IGNORE INTO accounts (accountID , userType, username, password) VALUES (?,?,?,?);`
 
                                        // const hashed = await bcrypt.hash('1', 10)
                                       
                                        db.query(sqlregStud,[accountID,'student',lrn,hashed], (err,result)=>{
                                            if(err) return res.sendStatus(500)

                                         if(!err){
                                           const sqlregPis= `INSERT IGNORE  INTO studpis(LRN, accountID, lastname, firstname, middlename, contactNumber, gradeLevel, pisID, counsellingRec) VALUES (?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE gradeLevel = ?`
                                           db.query(sqlregPis,[lrn, accountID, lastname, firstname, middlename, '0', grade, pisID, JSON.stringify([]),grade], (err,result)=>{
                                                   if(err) return res.sendStatus(500)
                                                        
                                                 if(!err){
                                                   const sqlregPis= `INSERT IGNORE  INTO piscontent (pisID, personalBackground, familyBackground, siblings, maritalStatus, educationalInformation, educbg2, uniqueHealthCosult, homeSketch, dateComplete, statusComp) VALUES (?,?,?,?,?,?,?,?,?,?,?)`
                                                   db.query(sqlregPis,[pisID, JSON.stringify(personalBG), JSON.stringify(familyBG),JSON.stringify([]), JSON.stringify(newMaritalStatus) , JSON.stringify([]), JSON.stringify(educbg2), JSON.stringify(unique),JSON.stringify([]),JSON.stringify([]),'incomplete'], (err,result)=>{
                                                        if(err) return res.sendStatus(500)
                                                   })  
                                                 }
                                                      
                                           })  
                                         }
                                   
                                         })  


                                                
                                            //   let sql = `INSERT INTO students (LRN, lastname, firstname, middlename,grade) VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE grade = ?` 

                                            //   db2.query(sql,[...data,workbook.SheetNames[indexZ],workbook.SheetNames[indexZ]],(err,results,fields)=>{
                                            //           if(err) return console.log(err.message)

                                            //         //   console.log(results)
                                            //   })
                                        }

                                           
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