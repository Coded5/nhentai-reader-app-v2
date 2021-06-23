package com.nhentaireader;

import android.content.ContentResolver;
import android.content.ContentValues;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Log;
import androidx.annotation.RequiresApi;
import com.facebook.react.bridge.*;

import java.io.File;
import java.io.FileFilter;

public class DirectoryModule extends ReactContextBaseJavaModule {

    public DirectoryModule(ReactApplicationContext context) {
        super(context);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getFilesDir() {
        return getReactApplicationContext().getFilesDir().getAbsolutePath();
    }

    @ReactMethod
    public void listFolderInDirectory(String path, final Promise promise) {
        File file = new File(path);
        FileFilter dirFilter = new FileFilter() {
            @Override
            public boolean accept(File pathname) {
                return pathname.isDirectory();
            }
        };

        File[] dirs = file.listFiles(dirFilter);
        WritableArray paths = Arguments.createArray();
        for(int i = 0; i < dirs.length; i++) {
            paths.pushString(dirs[i].getAbsolutePath());
        }
        promise.resolve(paths);
    }

    @ReactMethod
    public void listFileInDirectory(String path, final Promise promise) {
        File file = new File(path);
        FileFilter dirFilter = new FileFilter() {
            @Override
            public boolean accept(File pathname) {
                return !pathname.isDirectory();
            }
        };

        File[] dirs = file.listFiles(dirFilter);
        WritableArray paths = Arguments.createArray();
        for(int i = 0; i < dirs.length; i++) {
            paths.pushString(dirs[i].getAbsolutePath());
        }
        promise.resolve(paths);
    }

    @ReactMethod
    public void listAllDownloaded(String path, final Promise promise) {
        File file = getReactApplicationContext().getFilesDir();
        FileFilter dirFilter = new FileFilter() {
            @Override
            public boolean accept(File pathname) {
                return pathname.isDirectory();
            }
        };

        File[] dirs = file.listFiles(dirFilter);
        WritableArray paths = Arguments.createArray();
        for(int i = 0; i < dirs.length; i++) {
            paths.pushString(dirs[i].getAbsolutePath());
        }
        promise.resolve(paths);
    }

    @Override
    public String getName() {
        return "DirectoryModule";
    }

}
