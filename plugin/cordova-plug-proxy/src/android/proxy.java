package cordova.plugin.proxy;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import frp.Frp;
/**
 * This class echoes a string called from JavaScript.
 */
public class proxy extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("connect")) {
            // JSONObject server_addr = args.getJSONObject(1);
            // final long duration = args.getLong(0);
            this.connect(
                args.getString(0),
                args.getLong(1),
                args.getString(2),
                args.getString(3),
                args.getString(4),
                args.getLong(5),
                callbackContext
            );
            return true;
        }
        return false;
    }

    private void connect(String server_addr, long server_port, String ctype, String server_name, String bind_addr, long bind_port, CallbackContext callbackContext) {
        if (server_name.length() > 0) {
            Frp.connect(server_addr, server_port, ctype, server_name, bind_addr, bind_port);
            callbackContext.success(server_name);
        } else {
            callbackContext.error("server_name 不存在！");
        }
    }
}
