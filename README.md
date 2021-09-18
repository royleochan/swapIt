
# SwapIt Frontend

This repository contains the code for the frontend of SwapIt. It is built using the cross platform react native tool together with the [expo managed workflow](https://docs.expo.io/introduction/managed-vs-bare/#managed-workflow) so that we can use the various features that expo provides.

Notable Dependencies:

- [Expo](https://expo.io) for native device features such as notifications
- [Redux](https://redux.js.org/) for state management
- [React Navigation](https://reactnavigation.org/) for navigating between screens
- [React Native Elements](https://reactnativeelements.com/) for out-of-the-box UI components
- [React Hook Form](https://react-hook-form.com/) for form handling

## Installation

1. Ensure you have [node](!https://nodejs.org/en/download/) installed together with npm.

2. Download [expo](https://expo.io)

## Running the app

1. Create a .env file in the root of the app containing the REACT_APP_BACKEND_URL variable
    
    Env File Template:
    ```
    REACT_APP_BACKEND_URL = <url>
    ```

   - Option 1: Using development backend 
  
        **Development backend works with both simulator and physical device**

    ```
    REACT_APP_BACKEND_URL = https://swapit-backend.herokuapp.com
    ```

    - Option 2: Using local backend
    
        **Using local backend only works with SIMULATOR, physical device cannot communicate with local host server**

    ```
    REACT_APP_BACKEND_URL = http://localhost:5000
    ```

     - Option 3: Using ngrok tunnelling
    
        **This method solves the above problem allowing both physical device and simulator to communicate with the local backend**

    1. Download [ngrok](https://ngrok.com/download)
   
    2. Run the backend server 

    3. Open up terminal and get the tunnel url from ngrok using ```ngrok http 5000``` (use correct port number if you change the default port on the BE)

        ![Ngrok Demo](https://i.imgur.com/RMJGem5.gif)

    4. ngrok url is not fixed and below is just an example

    ```
    REACT_APP_BACKEND_URL =  http://1dddc11ae286.ngrok.io
    ```
2. Install dependencies

```
npm install
```

3. Run the server on localhost
  
```bash
expo start
```

4. **NOTE: you need to clear the cache and run whenever u change the ENV file. If there is unexpected behaviour, run the following command instead of expo start when starting to be safe**

```bash
expo r -c
```

## Opening the app

### 1. Physical Mobile Devices

- Download ```expo go``` app on the phone
  
- Simply scan the QR code created after running ```expo start```. This should trigger the phone to open the app.

### 2. IOS Simulators

- [Testing on IOS Simulators](https://docs.expo.io/workflow/ios-simulator/) (Only works on macOS)

### 3. Android Simulators

- [Testing on Android Simulators](https://docs.expo.io/workflow/android-studio-emulator/)

## Notifications

- Push Notifications only work on physical devices and not on simulators.

## Deployment

### Generate Build 

IOS:
```
expo build:ios
```

Android:
```
expo build:android -t app-bundle
```

1. Download build file from expo
2. Upload build file to testflight / google play console
3. Make release