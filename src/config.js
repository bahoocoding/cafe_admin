const editorConfiguration = {
   
    toolbar: {
        items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'alignment',
            '|',
            'outdent',
            'indent',
            'fontFamily',
            'fontSize',
            'fontColor',
            'fontBackgroundColor',
            '|',           
            'imageUpload',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo',
            'htmlEmbed',
            'horizontalLine'
        ]
    },
    language: 'vi',
				image: {
					toolbar: [
						'imageTextAlternative',
						'imageStyle:full',
						'imageStyle:side'
					]
				},
				table: {
					contentToolbar: [
						'tableColumn',
						'tableRow',
						'mergeTableCells'
					]
				},
				licenseKey: '',
    ckfinder:{
        uploadUrl:'http://192.168.1.10:5000/api/uploads/editorimage'
    }
};
const GoogleMapKey="AIzaSyBcZDJWXmWaogNAenB6dtXboTQOZf95ais";
const reCaptchaKey="6Lemne4aAAAAAEN3NKbbvlKIgpjXdMhUD4qNkRXw";
const server="http://localhost:5000";
export {editorConfiguration,GoogleMapKey, reCaptchaKey,server};