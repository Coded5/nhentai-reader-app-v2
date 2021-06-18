package com.nhentaireader;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.util.Log;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class RequestModule extends ReactContextBaseJavaModule {

     private static final String NH_URL = "https://nhentai.net/api/gallery/";

     public RequestModule(ReactApplicationContext context) {
          super(context);
     }

     @ReactMethod(isBlockingSynchronousMethod = true)
     public String getRequest(String req_url) {
          Log.d(getName(), "Sending request to "+req_url);
          try {
               URL url = new URL(req_url);
               HttpURLConnection con = (HttpURLConnection) url.openConnection();

               con.setRequestMethod("GET");
               con.setRequestProperty("accept", "application/json");

               InputStream response = con.getInputStream();
               BufferedReader in = new BufferedReader(new InputStreamReader(response));
               String inputLine;
               StringBuffer content = new StringBuffer();
               while ((inputLine = in.readLine()) != null) {
                    content.append(inputLine);
               }
               in.close();

               return content.toString();

          } catch (IOException e) {
               Log.e(getName(), e.getMessage());
               return "";
          }
     }

     @ReactMethod(isBlockingSynchronousMethod = true)
     public String getNH(String id) {
          String req_url = NH_URL+id;
          Log.d(getName(), "Get NH with id : " + id);
          Log.d(getName(), "Sending request to "+req_url);
          try {
               URL url = new URL(req_url);
               HttpURLConnection con = (HttpURLConnection) url.openConnection();

               con.setRequestMethod("GET");
               con.setRequestProperty("accept", "application/json");

               InputStream response = con.getInputStream();
               BufferedReader in = new BufferedReader(new InputStreamReader(response));
               String inputLine;
               StringBuffer content = new StringBuffer();
               while ((inputLine = in.readLine()) != null) {
                    content.append(inputLine);
               }
               in.close();

               return content.toString();

          } catch (IOException e) {
               Log.e(getName(), e.getMessage());
               return "";
          }
     }

     @Override
     public String getName() {
          return "RequestModule";
     }

}
