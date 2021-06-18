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

    @RequiresApi(api = Build.VERSION_CODES.Q)
    @ReactMethod(isBlockingSynchronousMethod = true)
    public String testDownloadWrite() {
        ContentResolver resolver = getReactApplicationContext().getContentResolver();

        Uri collection;
        collection = MediaStore.Downloads.getContentUri(MediaStore.VOLUME_EXTERNAL_PRIMARY);

        ContentValues file = new ContentValues();
        file.put(MediaStore.Downloads.DISPLAY_NAME, "test.txt");
        Uri result = resolver.insert(collection, file);
        Log.d(getName(), result.getPath());
        return result.getPath();
    }

    @ReactMethod
    public void listAllDownloaded(final Promise promise) {
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
