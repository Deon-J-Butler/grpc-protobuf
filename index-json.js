const fs = require("fs")

const employees = []

employees.push({
    "id": 1001,
    "name": "Deon",
    "salary": 1200
})

const jason = {
    "id": 1002,
    "name": "Jason",
    "salary": 1300
}

employees.push(jason)

fs.writeFileSync("jsondata.json", JSON.stringify(employees))