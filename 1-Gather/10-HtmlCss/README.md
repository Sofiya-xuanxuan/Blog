# HtmlCss

### 1.input type='range'自定义样式

```basic
#html
<input id="snrPollInterval"
                 type="range"
                 min="1"
                 max="30">
#css
input[type="range"] {
  /*-webkit-box-shadow: 0 1px 0 0px #424242, 0 1px 0 #060607 inset, 0px 2px 10px 0px black inset, 1px 0px 2px rgba(0, 0, 0, 0.4) inset, 0 0px 1px rgba(0, 0, 0, 0.6) inset;*/
  -webkit-appearance: none; /*去除默认样式*/
  margin-top: 42px;
  background-color: #ebeff4;
  /*border-radius: 15px;*/
  width: 80% !important;
  -webkit-appearance: none;
  height: 4px;
  padding: 0;
  border: none;

  /*input的长度为80%，margin-left的长度为10%*/
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; /*去除默认样式*/
  cursor: default;
  top: 0;
  height: 20px;
  width: 20px;
  transform: translateY(0px);
  /*background: none repeat scroll 0 0 #5891f5;*/
  background: #fff;
  border-radius: 15px;
  border: 5px solid #006eb3;
  /*-webkit-box-shadow: 0 -1px 1px #fc7701 inset;*/
}
```



