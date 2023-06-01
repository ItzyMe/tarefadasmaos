prediction1=""
prediction2=""

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
})
 camera=document.getElementById("camera")

//Adicionando a câmera no html e pedindo permissão
Webcam.attach("#camera")

function takeSnapshot(){
    Webcam.snap(function(data_uri){
   document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    }
    )
}
console.log("ml5 version ",ml5.version)
//Importando  o ml5:
//imageClassifier é uma função que classifica imagem "(imagem que eu quero qu seja classificado, o que quero que façam com a imagem)" 
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/2Q3WrmTl_/.json',modelLoaded);
function modelLoaded(){
    console.log("Model Loaded funcionando")

} 
function speak(){
//A var synth armazena uma API speechSynthesis( fala na página)
    var synth = window.speechSynthesis;
    speakData1= "A primeira previsão é: "+ prediction1
    speakData2= "A segunda previsão é: "+ prediction2
    //Converte texto em fala
     var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
     //aciona a fala synth.speak(utterThis);
// utterThis é a variável que armazena o texto convertido em fala
//SpeechSynthesisUtterance - é a função de uma API que irá converter texto em fala.
synth.speak(utterThis);

}
function check(){
 img=document.getElementById("captured_image") 
 classifier.classify(img,gotResult)
}
function gotResult(error,results){
 if(error){
 console.error(error)   
 } else{
    console.log(results)
    document.getElementById("resultEmotionName").innerHTML=results[0].label
    document.getElementById("resultEmotionName2").innerHTML=results[1].label
    prediction1=results[0].label
    prediction2=results[1].label
    speak()
    if (results[0].label=="METAL") {
        document.getElementById("updateEmoji").innerHTML="&#128522;"
        
    }
    if (results[0].label=="OK") {
        document.getElementById("updateEmoji").innerHTML="&#128532;"
    }
    if (results[0].label=="XIIS") {
        document.getElementById("updateEmoji").innerHTML="&#128548;" }


        if (results[1].label=="METAL") {
            document.getElementById("updateEmoji2").innerHTML="&#128522;"
            
        }
        if (results[1].label=="OK") {
            document.getElementById("updateEmoji2").innerHTML="&#128532;"
        }
        if (results[1].label=="XIIIS") {
            document.getElementById("updateEmoji2").innerHTML="&#128548;" }   
 } 
}