auth

	"POST /user/signIn/password":
						"authentication.signInUsingPhoneNumberAndPassword",
              
"POST /user/signIn/resendOTP": "authentication.resendOTPForLogin",
  
  user

	"POST /update/password/initiate":
						"authentication.initiatePasswordUpdateViaOTP",
					"POST /update/password/verify":
						"authentication.verifyOTPAndUpdatePassword",
