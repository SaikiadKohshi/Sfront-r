const menuButton = document.getElementById("menuButton");
const slideMenu = document.getElementById("slideMenu");
const body = document.body;


const OPEN_CLASS = 'is-open';
const LOKE_CLASS = 'is-locked';

function toggleMenu(isOpen){
    slideMenu.classList.toggle(OPEN_CLASS, isOpen);
    body.classList.toggle(LOKE_CLASS, isOpen);
    menuButton.setAttribute('aria-expanded',String(isOpen));




    /* 未完 */
    // フォーカストラップ（Focus Trap)
    if(isOpen){
        /* 強制的に四角枠を表示させる */
        requestAnimationFrame(()=>{
            setupFocusTrap(); // ← ★絶対必要

        });
       
    }else{
        menuButton.focus(); // ← 元に戻す
    }
    /* ESCキーで'keydown'を使ってるので実務ではkeydown は「1か所」に集約するため、以下のコードは全部コメントアウトする、もしESCキーなどの関数何無く、'keydown'が一回も使われてなかったら以下のコードを必ずこの集約関数内(ここのディレクトリ内では「function toggleMenu(isOpen)」という集約関数)で必ず書く
    if(isOpen){ もしメニューを開くなら 
       setupFocusTrap();  setupFocusTrap()内のコードを実装する 
       document.addEventListener('keydown',handleFocusTrap);  setupFocusTrap();を実装する時にhandleFocusTrap内のコードによる動作をwebサイト上でする 
    }else{ もしメニューを閉じるなら 
        document.removeEventListener('keydown',handleFocusTrap);  setupFocusTrap();を実装する時にhandleFocusTrap内のコードによる動作をwebサイト上でする 
        menuButton.focus();  メニュー閉じたら元に戻す
    }
    */
}

// メニューボタンを開く
menuButton.addEventListener('click',()=>{
    console.log('clicked');
    const isOpen = !slideMenu.classList.contains(OPEN_CLASS);
    toggleMenu(isOpen);
});
// メニュー外クリックで閉じる
document.addEventListener('click',(e)=>{
    //e.stopPropagation();
    if(slideMenu.classList.contains(OPEN_CLASS) && !slideMenu.contains(e.target) && !menuButton.contains(e.target)){
        toggleMenu(false);
    }
});
// 'keydown'を使ったjacascript機能の集約関数
document.addEventListener('keydown',(e)=>{
    // ESCキーで閉じる機能の部分
    if(e.key=="Escape" || e.key === 'Esc'){
        e.preventDefault();
        toggleMenu(false);
    }
    /* 未完 */
    if(slideMenu.classList.contains(OPEN_CLASS)){
        handleFocusTrap(e);
    }
});
// メニュー内リンククリックで自動クローズ
const menuLinks = slideMenu.querySelectorAll('a');
menuLinks.forEach(link=>{
    link.addEventListener('click',()=>{
        toggleMenu(false);
    })
});






/* 未完 */
// フォーカストラップ（Focus Trap)
let focusableElements = [];
let firstFocusableEI = null;
let lastFocusableEI = null;

function setupFocusTrap(){
    focusableElements = slideMenu.querySelectorAll(
        'a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length==0) return; /* もしfocusableElementsの中のタグが存在しなかったらフォーカストラップをせずにそのまま終了する */

    firstFocusableEI=focusableElements[0]; /* 初期値 */
    lastFocusableEI=focusableElements[focusableElements.length-1]; /* 今ユーザーが操作してるタグをlastFocusableEIに代入する */

    // 最初の要素にフォーカス
    // ★ここで四角枠が出る
    firstFocusableEI.focus();

}

function handleFocusTrap(e){
    if(e.key!=='Tab')return; /* もしタグが存在しなかったら、フォーカストラップをせずにそのまま終了する */

    if(e.shiftKey){
       //Shift + Tab
       if(document.activeElement===firstFocusableEI){
          e.preventDefault(); // ブラウザ標準挙動を止める 画面サイズが変わるのを止めたい場合（上級）
          lastFocusableEI.focus(); // 最初の要素にフォーカス
       }

        
    }else{
        //Tab
        if(document.activeElement===lastFocusableEI){
            e.preventDefault(); // ブラウザ標準挙動を止める 画面サイズが変わるのを止めたい場合（上級）
            firstFocusableEI.focus(); // 最初の要素にフォーカス
        }
    }
}

/* フォーカストラップ（Focus Trap)を実装 */
/*
    実装後の挙動（確認ポイント）
    ✅ メニューを開く
        最初のリンクにフォーカスが当たる ⭕️
    ✅ Tabキー
        メニュー内を順番に移動
        最後 → 最初に戻る
    ✅ Shift + Tab
        最初 → 最後に戻る
    ✅ メニューを閉じる
        フォーカスがハンバーガーボタンに戻る

    「見た目変わらんけど意味ある？」問題
    これ、aria-expanded と全く同じ。
    見た目：変わらない
    内部品質：激変
    👉「使えない人が出ないUI」になる


*/


/* フォーカストラップ（Focus Trap） */
/* 意味、用途、役割、メリット */
/*
    Tabキー
    　Tab → 次のフォーカス可能要素へ
    　Shift + Tab → 前のフォーカス可能要素へ
    　フォーカス可能要素例：
        <a>/<button>/<input>/<select>/<textarea>
 
    フォーカストラップが無いと何が起きるか
    　❌ ダメな例（今の状態）
        メニューを開く
        Tabキー押す
        メニュー内を移動
        気づいたら背景のリンクやボタンに飛ぶ
        👉
        見えない場所にフォーカス
        キーボード操作の人は現在地を完全に見失う
        アクセシビリティ的にアウト（WCAG違反）

    フォーカストラップがあると
    　　✅ 正しい挙動
        メニューを開いてる間
        Tab / Shift+Tab を押しても
        フォーカスはメニュー内でループ
        👉
        「このUIはいまモーダル状態です」という宣言になる。

    どんな場面で使われる？
            UI	                      必須度
        ハンバーガーメニュー	         ★★★★☆
        モーダルダイアログ               ★★★★★（必須）
        アラート / 確認ダイアログ	      ★★★★★
        ログインポップアップ	          ★★★★★
        👉 案件では「入ってて当たり前」

    メリットまとめ
        ・キーボード操作ユーザーに優しい
        ・スクリーンリーダー対応が一気に向上
        ・「ちゃんとしたUI」感が爆上がり
        ・アクセシビリティレビューで突っ込まれない

*/



