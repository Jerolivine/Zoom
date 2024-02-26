import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { ZoomMtg } from '@zoomus/websdk';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'zoom-test';

  leaveUrl: string = "http://localhost:4200/leave";
  authEndpoint = 'http://localhost:4000'

  payload: any;

  constructor(public httpClient: HttpClient) {
    this.payload = {
      meetingNumber: "2219336165",
      role: 1,
      password: "ARDA",
      leaveUrl: "http://localhost:4200/leave",
      userName: "Arda"
    }
  }

  async ngAfterContentInit(): Promise<any> {

    console.log("ngAfterContentInit");

    const zoomEmbed = await (await import("@zoomus/websdk/embedded")).default;

    let client = zoomEmbed.createClient();

    this.httpClient.post(this.authEndpoint, {
      meetingNumber: this.payload.meetingNumber,
      role: this.payload.role
    }).toPromise()
      .then((data: any) => {
        debugger;
        let meetingSDKElement = document.getElementById("meetingSDKElement");

        if (!meetingSDKElement) {
          console.error("meetingSDKElement couldnt found");
          return;
        }

        client.init({
          zoomAppRoot: meetingSDKElement,
          language: 'en-US'
        });

        client.join({
          meetingNumber: this.payload.meetingNumber,
          userName: this.payload.userName,
          sdkKey: data.sdkKey,
          password: this.payload.password,
          tk: '',
          signature: data.signature
        });
      })
      .catch((error) => {
        console.log(error)
      })



  }

  private ZomMtg() {
    // debugger;
    // const { ZoomMtg } = await(await import("@zoomus/websdk/embedded")).default;

    // console.log("ngAfterContentInit");
    // ZoomMtg.setZoomJSLib();
    // // ZoomMtg.setZoomJSLib('https://source.zoom.us/3.1.6/lib', '/av')
    // ZoomMtg.preLoadWasm();
    // ZoomMtg.prepareWebSDK();

    // const payload = {
    //   meetingNumber: this.meetingNumber,
    //   password: this.password,
    //   sdkKey: this.sdkKey,
    //   sdkSecret: this.sdkSecret,
    //   role: this.role,
    //   leaveUrl: this.leaveUrl,
    //   userName: this.userName
    // };

    // ZoomMtg.generateSDKSignature({
    //   meetingNumber: payload.meetingNumber,
    //   role: payload.role,
    //   sdkKey: payload.sdkKey,
    //   sdkSecret: payload.sdkSecret,
    //   success: function (signature: any) {
    //     ZoomMtg.init({
    //       leaveUrl: payload.leaveUrl,
    //       success: function (data: any) {
    //         ZoomMtg.join({
    //           meetingNumber: payload.meetingNumber,
    //           passWord: payload.password,
    //           sdkKey: payload.sdkKey,
    //           userName: payload.userName,
    //           userEmail: "",
    //           signature: signature.result,
    //           tk: "",
    //           success: function (data: any) {
    //             console.log(data);
    //           },
    //           error: function (error: any) {
    //             console.error("ZoomMtg.join: " + error);
    //           }
    //         })
    //       }
    //     })
    //   },
    //   error: function (error: any) {
    //     console.error("generateSDKSignature: " + error);
    //   }
    // });
  }

}
