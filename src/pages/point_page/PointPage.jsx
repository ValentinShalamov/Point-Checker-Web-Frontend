import {Header} from "./components/header/Header.jsx";
import GlobalSetting from "./components/global_setting/GlobalSetting.jsx";
import MainContent from "./components/main_content/MainContent.jsx";

export default function PointPage() {
    return (
        <GlobalSetting>
            <Header/>
            <MainContent />
        </GlobalSetting>
    );
}