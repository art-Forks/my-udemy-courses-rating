## Intro

使用方式:  
請自行[Release頁面](https://github.com/art-Forks/my-udemy-courses-rating/releases)，下載本次修正的版本`v1.0.2`之後依照下方的Chrome安裝外掛說明使用

調整說明:  

1. 增加`評等數`, `註冊數`
1. 刪除已經無效的註冊事件

已知問題:  

1. 點連結後無法重新爬資訊，需要重新整理頁面
1. 目前抓取資訊比對採用`regex`，未來可能遇到UI改版就掛掉

備註:  
有興趣的自行取用抓去改



## [原作Github](https://github.com/0t2/my-udemy-courses-rating) 以下為原開發者 Readme.md

非開發者:

1. 前往 [release](https://github.com/0t2/my-udemy-courses-rating/releases) 下載 build.zip

2. 解壓縮並參考[這篇文章](https://ithelp.ithome.com.tw/articles/10156599)載入套件

---
開發者:

```
npm i
npm run build
```

---
預覽如下:

1. 分數會顯示在紅框處，請耐心等待分數出現
2. 如果沒有分數，可能是**課程不開放註冊**或被認為是**機器人**了

![preview](images/preview.png)

---
程式作法簡介:

1. 套件只會作用在 https://www.udemy.com/home/my-courses/ 底下的網頁
2. 抓出頁面所有的網址
3. 依序前往介紹頁面抓分數，最多會連發 12 個請求
4. 因為怕被判定為機器人，所以中間有加延遲