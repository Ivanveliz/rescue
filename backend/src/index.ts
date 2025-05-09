import express, {Request, Response} from 'express'

const app = express()

app.get('/',(req:Request, res:Response)=>{
    res.send('Servidor Corriend')
});

app.listen(3000, () =>{
    console.log("Corriendo puerto en 3000")
})


