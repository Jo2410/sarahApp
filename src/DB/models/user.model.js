import mongoose from "mongoose";

export let genderEnum={male:'male',female:'female'}
export let roleEnum={user:'user',admin:'admin'}
export let providerEnum={system:'system',google:'google'}



const userSchema= new mongoose.Schema({

    firstName:{type:String,
        required:true,
        minLength:2,maxLength:[20,'firstName max is 20 char and you have entered {VALUE}']
    },
    lastName:{type:String,
        required:true,
        minLength:2,maxLength:[20,'lastName max is 20 char and you have entered {VALUE}']
    },
    email:{type:String,
        required:true,
        unique:true
    },
    password:{type:String,
        required:function () {
            console.log({DOC:this});
            
            return this.provider === providerEnum.system ? true : false
        }
    },
    phone:{type:String,
        required: function () {
            return this.provider=== providerEnum.system ? true : false 
        }
    },
    gender:{
        type:String,
        enum:{values:Object.values(genderEnum),message:`gender only allow ${Object.values(genderEnum)}`},
        default:genderEnum.male
    },
    role:{
        type:String,
        enum:Object.values(roleEnum),
        default:roleEnum.user
    },

    
    provider:{type:String,enum:Object.values(providerEnum),default:providerEnum.system},
    confirmEmail:Date,
    confirmEmailOtp:String,
    picture:String

},{
    timestamps:true ,
    toObject:{virtuals:true},
    toJSON:{virtuals:true}
})

userSchema.virtual('fullName').set(function(value) {
    const [firstName,lastName]=value?.split(' ')||[]
    this.set({firstName,lastName})

}).get(function()
{
    return this.firstName+' '+this.lastName
})



export const userModel= mongoose.models.User || mongoose.model('User',userSchema)
userModel.syncIndexes()