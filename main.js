//Key lấy từ tài khoản AWS
AWS.config.region = 'ap-northeast-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-northeast-1:987edeb0-5d6d-4e7a-9c53-334bacac5816',
});
document.getElementById('myFile').onchange = function () {

    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function (progressEvent) {
        // đọc file
        const state = document.getElementById('state');
        const msg = 'Upload successfully';
        state.innerHTML = msg;
        let res = this.result
        console.log(res);
        document.getElementById('textEntry').value = res;
    };
    reader.readAsText(file);
};
//Hàm xử lý event onchange lấy thông tin ngôn ngữ do người dùng chọn khi select -> option
function getInfo() {
    a = document.getElementById('author').value;
    return a
}
function clearText() {
    a = document.getElementById('textEntry').value;
    if (a !== null)
        document.getElementById('textEntry').value = '';

    document.getElementById('myFile').value = null;
}
//Hàm xử lý khi click vào nút chuyển đổi 
function speakText() {
    var textType = "text";
    const layGiatrihehe = document.getElementById('textEntry').value 
    var subDes = layGiatrihehe.slice(0,7);
    var inputs;
    if (subDes == '<speak>')
    {
        inputs = document.querySelector('.toggle');

        inputs.checked = true;
    }
    else
    {
        inputs = document.querySelector('.toggle');

        inputs.checked = false;
    }
    // Get the checkbox
    var checkBox = document.getElementById("toggle");

    // If the checkbox is checked, display the output text
    if (checkBox.checked == true) {
        textType = "ssml"

    }
    // Tạo 1 object là speechParams có các thuộc tính như bên dưới
    var speechParams = {
        OutputFormat: "mp3",
        SampleRate: "22050",
        Text: "",
        TextType: textType,
        VoiceId: ""
    };
    speechParams.VoiceId = getInfo()
    //Dòng ngay trên trên là gán thuộc tính Voiced của Object speechParams là ngôn ngữ do người dùng chọn
    speechParams.Text = document.getElementById("textEntry").value;

    if (speechParams.Text == '')
    {
        alert('Chưa có thông tin để có thể đọc')
    }

    else
    {
    //Dòng phía trên trên là gán thuộc tính Text của Object speechParams là đoạn văn bản người dùng nhập

    // Tạo đối tượng dịch vụ Polly và đối tượng presigner 
    var polly = new AWS.Polly({ apiVersion: '2016-06-10' });
    var signer = new AWS.Polly.Presigner(speechParams, polly)

    // Tạo url được chỉ định trước cho AWS.Polly.synthesizeSpeech ()
    signer.getSynthesizeSpeechUrl(speechParams, function (error, url) {
        if (error) {//không thể chuyển đỗi
            document.getElementById('result').innerHTML = error;//báo lỗi 
        } else {//chuyển thành công, gán src của audio bằng url, load dữ liệu, thông bán speech sẵn sàng.
            document.getElementById('audioSource').src = url;
            document.getElementById('audioPlayback').load();
            document.getElementById('result').innerHTML = "Speech ready to play.";
        }
    });
    }
}