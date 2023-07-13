const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

const filesPayloadExists = require('./middleware/filesPayloadExists');
const fileExtLimiter = require('./middleware/fileExtLimiter');
const fileSizeLimiter = require('./middleware/fileSizeLimiter');

const XLSX = require('xlsx');
const mysql = require("mysql");

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'dbtestings'
});

const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const fs = require('fs')
const PORT =  3100;

const app = express();

//  app.use(cors(corsOptions));

// app.use(cors({
//     origin: ["http://localhost:3000"],
//     methods:['get','post','patch','delete'],
//     credentials: true
//   }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// app.use('/img', express.static(__dirname + '/filesx/FLUERENCE.png'));
app.use('/img', express.static(__dirname +'/filesx/0_FLUERENCE.png'));

app.use('/img/:pname', (req, res, next) => {
    const pname = req.params.pname
        express.static(__dirname + '/filesx/'+pname)(req, res, next);
  });

app.delete('/img/delete', (req, res) => {
    fs.unlinkSync(__dirname + '/filesx/0_FLUERENCE.png')
    res.sendStatus(200)
});

app.post('/upload',
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter(['.png', '.jpg', '.jpeg', '.xlsx']),
    fileSizeLimiter,
    (req, res) => {
        const files = req.files

        let nameofFile=[]


        Object.keys(files).forEach(key => {
            nameofFile.push(files[key].name)
            // const filepath = path.join( files[key].name)
            // const filepath = path.join( __dirname,files[key].name)
            const filepath = path.join(__dirname,'students', 'LRN',files[key].name)
            files[key].mv(filepath, (err) => {
                if (err) return res.status(500).json({ status: "error", message: err })
            })
        })




        //  console.log(files)
        //  console.log(nameofFile[0])
        // const workbook = XLSX.readFile(nameofFile[0])

        // const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        
        // const range = XLSX.utils.decode_range(worksheet["!ref"])
        
          
        // //   console.log(worksheet)
        // //   console.log(range)
        
        // for(let index = 1; index <= range.e.r; index++){
        //     // const nameX = worksheet[`A${index}`].v;
        //     // const ageX = worksheet[`B${index}`].v;
        //     // const schoolX = worksheet[`C${index}`].v;
        
        //     // console.log({
        //     //     name:nameX,
        //     //     age:ageX,
        //     //     school:schoolX
        //     // })
        //     let data = []
        //             for(let col = range.s.c; col<=range.e.c; col++){
        //                 let cell = worksheet[XLSX.utils.encode_cell({r:index, c:col})]
        //                 data.push(cell.v)
        //             }
        //         console.log(data)
        
        //         let sql = 'INSERT INTO `student` (name, age, school) VALUES (?,?,?) ' 
        
        //         db.query(sql,data,(err,results,fields)=>{
        //                 if(err) return console.log(err.message)
        
        //                 console.log('USER ID:'+ results.insertId)
        //         })
        // }


 

        return res.json({ status: 'success', message: Object.keys(files).toString() })
    }
)

// const workbook = XLSX.readFile('example2s.xlsx')

// const worksheet = workbook.Sheets[workbook.SheetNames[0]]

// const range = XLSX.utils.decode_range(worksheet["!ref"])

  
// //   console.log(worksheet)
// //   console.log(range)

// for(let index = 1; index <= range.e.r; index++){
//     // const nameX = worksheet[`A${index}`].v;
//     // const ageX = worksheet[`B${index}`].v;
//     // const schoolX = worksheet[`C${index}`].v;

//     // console.log({
//     //     name:nameX,
//     //     age:ageX,
//     //     school:schoolX
//     // })
//     let data = []
//             for(let col = range.s.c; col<=range.e.c; col++){
//                 let cell = worksheet[XLSX.utils.encode_cell({r:index, c:col})]
//                 data.push(cell.v)
//             }
//         console.log(data)

//         let sql = 'INSERT INTO `student` (name, age, school) VALUES (?,?,?) ' 

//         db.query(sql,data,(err,results,fields)=>{
//                 if(err) return console.log(err.message)

//                 console.log('USER ID:'+ results.insertId)
//         })
// }

    const workbook = XLSX.readFile('students.xlsx')

        for(let index = 0; index < 2; index++){

        const worksheet = workbook.Sheets[workbook.SheetNames[index]]

        const range = XLSX.utils.decode_range(worksheet["!ref"])
    
        console.log(range)

        for(let index2 = 2; index2 < (range.e.r + 2); index2++){
        const lrn = worksheet[`A${index2}`].v;
        const lastname = worksheet[`B${index2}`].v;
        const firstname = worksheet[`C${index2}`].v;
        const middlename = worksheet[`D${index2}`].v;
        const gradeLevel = worksheet[`E${index2}`].v;

    console.log({
        lrn:lrn,
        lastname:lastname,
        firstname:firstname,
        middlename:middlename,
        gradeLevel:gradeLevel
    })
    // let data = []
    //         for(let col = range.s.c; col<=range.e.c; col++){
    //             let cell = worksheet[XLSX.utils.encode_cell({r:index, c:col})]
    //             data.push(cell.v)
    //         }
    //     console.log(data)

        }
      
    }



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));