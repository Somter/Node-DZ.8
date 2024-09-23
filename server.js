var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var fs = require('fs');

var app = express();
const par = bodyparser.urlencoded({extended:false,});

function writeFile(first, second, third, fourth, fifth){
    var data = {
        first: first,
        second: second,
        third: third,
        fourth: fourth, 
        fifth: fifth
    };

    var dataJson = JSON.stringify(data, null, 2);

    fs.writeFile('Products.txt', dataJson, (err) => {
        if(err){
            console.log('Ошибка при записи данных в файл!');
        }
        else{
            console.log('Данные успешно записаны в файл');
        }
    });
}


function ReadFile(callback) {
    fs.readFile('Products.txt', 'utf8', (err, data) => {
        if (err) {
            console.log('Ошибка при чтении файла!');
            callback(err, null); 
        } else {
            try {
                const jsonData = JSON.parse(data);  
                callback(null, jsonData);  
            } catch (parseErr) {
                console.log('Ошибка при парсинге JSON!');
                callback(parseErr, null);  
            }
        }
    });
}

app.post('/prod', par, function(request, response){
   console.log('add post');
   console.log(request.url);
   let first = request.body.firstproduct;
   let second = request.body.secondproduct;
   let third = request.body.thirdproduct;
   let fourth = request.body.fourthproduct;
   let fifth = request.body.fifthproduct;
   writeFile(first, second, third, fourth, fifth);
   response.send('<h1>Вы успешно добавили продукты!</h1>');
});

app.post('/edt', par, function(request, response){
    console.log('add post');
    console.log(request.url);
    let first = request.body.firstproduct;
    let second = request.body.secondproduct;
    let third = request.body.thirdproduct;
    let fourth = request.body.fourthproduct;
    let fifth = request.body.fifthproduct;
    writeFile(first, second, third, fourth, fifth);
    response.send('<h1>Вы успешно редактировали продукты!</h1>');
 });

app.get('/add', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/editPr', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname, '/edit.html'));
});

app.get('/all', function(request, response){
    console.log(request.url);
    
    ReadFile((err, jsonData) => {
        if (err) {
            response.send('<h1>Ошибка при чтении данных!</h1>');
        } else {
            response.send(`
                <h1>Список ваших продуктов: </h1>
                <ul>
                    <li>${jsonData.first}</li>
                    <li>${jsonData.second}</li>
                    <li>${jsonData.third}</li>
                    <li>${jsonData.fourth}</li>
                    <li>${jsonData.fifth}</li>
                </ul>
            `);
        }
    });
});

app.listen(8080, function(){
    console.log('server start on port 8080');
})