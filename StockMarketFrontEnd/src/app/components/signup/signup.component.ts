import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router' //引入Router
import { UserService } from '../../services/user.service'


interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  alerts: Alert[];

  constructor(public router: Router, public userService: UserService) { }

  ngOnInit(): void {
  }

  onSignUp(value: any, valid: boolean) {
    if (valid) {
      //往后台传送数据
      this.userService.postSignUp(value).subscribe((data: any) => {
        console.log(data)
        if (data.status == "OK") {
          //跳转到提示信息页面
          this.router.navigate(['/email-prompt']);
        }
        else {
          this.alerts.push({ type: 'danger', message: 'Please sign up again' });
          this.router.navigate(['/signup']);
        }
      })
    }
  }

}
