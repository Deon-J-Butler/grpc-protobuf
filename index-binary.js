const fs = require("fs")
const Schema = require("./employees_pb")

const deon = new Schema.Employee()
deon.setId(1001)
deon.setName("Deon")
deon.setSalary(1500)

const jason = new Schema.Employee()
jason.setId(1002)
jason.setName("Jason")
jason.setSalary(1400)

const employees = new Schema.Employees()

employees.addEmployees(deon)
employees.addEmployees(jason)

const bytes = employees.serializeBinary()

fs.writeFileSync("employeesbinary", bytes)

console.log(bytes)

const employees2 = Schema.Employees.deserializeBinary(bytes)

console.log(employees2.toString())