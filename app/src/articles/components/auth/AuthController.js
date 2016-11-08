class AuthController  {
  /**
   * Constructor
   *
   
   */
  constructor(ArticlesDataService, $mdDialog) {
    self = this;
    this.ArticlesDataService  = ArticlesDataService;
    this.$mdDialog = $mdDialog;
    this.login_data = {
      email: '',
      password: ''
    };
    this.forgot_data = {
      email: ''
    };
    this.signup_data = {
      email: '',
      password: '',
      re_password: '',
      name: ''
    };
    this.auth_view = 'login';
    this.isLoginLoading = false;
    this.isSignupLoading = false;
    this.isForgotLoading = false;
  }

  validateEmail(str){
    var patt = /^[a-zA-Z0-9._\+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return patt.test(str);
  }

  login() {
    this.login_error = false;
    if(!this.validateEmail(this.login_data.email) || !this.login_data.password){
      this.login_error = true;
      return;
    }
    var login_data = this.login_data;
    this.isLoginLoading = true;
    this.ArticlesDataService.getuser(login_data, function(err, data){
      self.isLoginLoading = false;
      console.log("ctrl", err, data);
      if(err || !data.length) {
        self.login_error = true;
        return;
      }
      console.log(data[0]);
      if (typeof(Storage) !== "undefined") {
        // Retrieve
        delete data[0].password;
        localStorage.setItem("auth", JSON.stringify(data[0]));
        self.app.auth = data[0];
        // self.assign(login_data);
      } else {
        // Sorry! No Web Storage support..
      }

    });

    
  }

  forgotPassword() {
    this.forgot_error = false;
    if(!this.validateEmail(this.forgot_data.email)){
      this.forgot_error = true;
      return;
    }
    console.log(this.forgot_data);
    var forgot_data = this.forgot_data;
    this.isForgotLoading = true;
    this.ArticlesDataService.forgotpassword(forgot_data, 'email', function(err, data){
      self.isForgotLoading = false;
      if(err || (data && !data.affectedRows)){
        self.forgot_error = true;
        return;
      }
      console.log(data);
      var alert = self.$mdDialog.alert({
        title: '',
        textContent: 'We have sent an instruction to the email on how to reset the password.',
        ok: 'Close'
      });

      self.$mdDialog
        .show( alert )
        .finally(function() {
          alert = undefined;
      });
      self.auth_view = 'login';
    });
    
  }

  signup() {
    console.log("signup", this.signup_data, !this.validateEmail(this.signup_data.email) , !this.signup_data.password , this.signup_data.password != this.signup_data.re_password , !this.signup_data.name);
    this.signup_error = false;
    if(!this.validateEmail(this.signup_data.email) || !this.signup_data.password || this.signup_data.password != this.signup_data.re_password || !this.signup_data.name ){
      this.signup_error = true;
      return;
    }
    console.log(this.signup_data);
    var signup_data = this.signup_data;
    this.isSignupLoading = true;
    this.ArticlesDataService.adduser(signup_data, function(err, data){
      self.isSignupLoading = false;
      if(err || (data && !data.affectedRows)){
        self.signup_error = true;
        return;
      }
      console.log(data);
      if (typeof(Storage) !== "undefined") {
        // Retrieve
        delete signup_data.password;
        delete signup_data.re_password;
        localStorage.setItem("auth", JSON.stringify(signup_data));
        self.app.auth = signup_data;
        // self.assign(signup_data);
      } else {
        // Sorry! No Web Storage support..
      }

    });
  }

  // assign(signup_data){
  //   this.app.auth = signup_data;
  // }

  // resetPassword() {
  //   this.signup_error = false;
  //   if(!this.signup_data.password || this.signup_data.password != this.signup_data.password){
  //     this.login_error = true;
  //     return;
  //   }
  //   console.log(this.signup_data);
  //   if (typeof(Storage) !== "undefined") {
  //     // Retrieve
  //     delete this.signup_data.password;
  //     localStorage.setItem("auth", JSON.stringify(this.signup_data));
  //   } else {
  //     // Sorry! No Web Storage support..
  //   }
    
  // }

}
export default AuthController;

