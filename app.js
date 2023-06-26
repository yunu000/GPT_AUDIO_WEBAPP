const express=require('express');
const app=express();
const cors = require('cors')

require('dotenv').config()
const {Configuration,OpenAIApi} = require('openai')


const allowedOrigins = ['https://getyouranswer.onrender.com'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }

}));
//setting api key for using OpenAi api
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})


//getting openAi instance using the configuration
const openAi = new OpenAIApi(configuration);

const port=5000

//setting static public folder as static for rendering js and css 
app.use(express.static("public"))

//default route for application
app.get("/",function(req,res)
{
	res.sendFile(__dirname+"/index.html");
});


//for getting gpt response 
app.get("/response",async function(req,res){
    const query=req.query.query;
    const completion = await openAi.createCompletion({
        model:"text-davinci-003",
        prompt: query,
        max_tokens:500  
    })
    res.send(
        {"response" : completion.data.choices[0].text

    })
    
})


app.listen(port,()=>{
    console.log("Listening on 5000")
})