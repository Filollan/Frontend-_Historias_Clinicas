export default {
    data: {
        type: Object,
        required: true
    },
    visible: {
        type: Boolean,
        required: true
    },
    header:{
        type: String,
        required: false
    },
    onSuccess: {
        type: Function,
        required: false
    },
    onClose: {
        type: Function,
        required: false
    },
    breakpoints: {
        type: Object,
        required: false
    },
    customHeader:{
        type:Boolean,
        required:false
    },
    buttonLabel:{
        type:String,
        required:false
    },
    customFooter:{
        type:Boolean,
        required:false
    },
    style:{
        type:Object,
        required:false
    },
    modal:{
        type:Boolean,
        required:false
    }
}