import iView from 'iview'; // vue ui插件
import 'iview/dist/styles/iview.css'; // 样式
import 'font-awesome/css/font-awesome.min.css'; // 字体图库

// LoadingBar进度条配置
iView.LoadingBar.config({
    color: '#ff0',
    failedColor: '#f0ad4e',
    height: 5
});
/**
 * 使用
 */
export default iView;
