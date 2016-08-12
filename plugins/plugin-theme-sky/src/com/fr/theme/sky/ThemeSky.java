package com.fr.theme.sky;

import com.fr.fs.fun.impl.AbstractThemeVariousProvider;
import com.fr.plugin.PluginLicense;
import com.fr.plugin.PluginLicenseManager;
import com.fr.stable.fun.Authorize;

/**
 * Created by ali13 on 2016/8/11.
 */
@Authorize(callSignKey = Constants.PLUGIN_ID)
public class ThemeSky extends AbstractThemeVariousProvider{

    @Override
    public String name() {
        return "SkyTheme";
    }

    @Override
    public String text() {
        return "天空主题";
    }

    @Override
    public String coverPath() {
        return "/com/fr/theme/sky/files/cover.png";
    }

    @Override
    public String scriptPath() {
        PluginLicense pluginLicense= PluginLicenseManager.getInstance().getPluginLicenseByID(Constants.PLUGIN_ID);
        if(pluginLicense.isAvailable()){
            return "/com/fr/theme/sky/files/theme.js";
        }else {
            return "";
        }
    }

    @Override
    public String stylePath() {
        PluginLicense pluginLicense= PluginLicenseManager.getInstance().getPluginLicenseByID(Constants.PLUGIN_ID);
        if(pluginLicense.isAvailable()){
            return "/com/fr/theme/sky/files/style.css";
        }else {
            return "";
        }
    }
}
