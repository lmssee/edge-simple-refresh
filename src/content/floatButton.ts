/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName floatButton.ts
 * @CreateDate  周六  09/14/2024
 * @Description 悬浮按钮的相关逻辑，涉及按钮的创建、监听事件
 ****************************************************************************/

import { setStyle } from '../common/element';
import { data } from './data';
import { message } from './message';

const name = 'reset-new-tab-float-button';
const id = `${name}-${Math.floor(Math.random() * 10000)}-id`;
/** # 悬浮按钮
 * - node       元素
 * - state      当前元素的状态，用于页面再次 visible 时鉴定状态是否恢复定时刷新
 * - id         元素的 id  字符串
 * - timeStamp  定时器返回的事件戳
 * - controller 控制器，方便移除监听事件，并未使用
 * - hide       隐藏悬浮按钮，触发于点击 “取消”
 * - show       展示悬浮按钮，触发于接受弹出窗口的消息
 * - suspend       暂停
 * - restore    恢复
 * - create     创建悬浮按钮
 */
export const floatButton = {
  /** 元素 */
  node: document.createElement(name),
  /** 当前元素的状态
   *
   * @returns {boolean} 当前元素是否显示
   */
  get state(): boolean {
    return this.node.style.visibility === 'visible';
  },
  /**  元素的名称 */
  name,
  /** 悬浮按钮的 id */
  id,
  /*** 定时器时间戳  */
  timeStamp: setTimeout(() => 0),
  /** 控制器，方便移除监听事件 */
  controller: new AbortController(),
  textShow: ['关闭', '暂停', '恢复'],
  /** 悬浮按钮隐藏 */
  hide() {
    this.node.style.visibility = 'hidden';
    clearTimeout(this.timeStamp); /// 清理定时器
    changeAnimationState(!1);
    (this.node.lastChild as HTMLElement)!.innerHTML = this.textShow[1];
    message.cancelRefresh();
  },
  /** 展示<停止刷新> 按钮 */
  show() {
    data.showTime = Date.now();
    let timeDifference = data.delay;
    // 若没有传值或传入的值为负时使用默认数据
    if (
      timeDifference <= 0 ||
      typeof timeDifference !== 'number' ||
      isNaN(timeDifference)
    )
      timeDifference = 1.2;
    setStyle(this.node, {
      visibility: 'visible',
      '--refreshAnimationDelay': `${timeDifference}s;`,
    });
    this.timeStamp = setTimeout(() => {
      window.location.reload();
    }, timeDifference * 1000);
  },
  /** 停止当前的状态 */
  suspend() {
    const now = Date.now();
    data.delay = (data.remainder = now - data.showTime) / 1000; /// 暂停操作
    clearTimeout(this.timeStamp); /// 清理定时器
    (this.node.childNodes[1] as HTMLElement).innerHTML = this.textShow[2];
    changeAnimationState();
  },
  /** 恢复状态 */
  restore() {
    data.showTime = Date.now();
    changeAnimationState(!1);
    (this.node.childNodes[1] as HTMLElement).innerHTML = this.textShow[1];
    this.timeStamp = setTimeout(() => {
      window.location.reload();
    }, data.remainder);
  },

  /** 创建一个停止刷新的按钮 */
  create() {
    const node = this.node;
    const floatBlock = document.createDocumentFragment();
    node.id = this.id;
    node.innerHTML = `<float-item>${this.textShow[0]}</float-item><float-item>${this.textShow[1]}</float-item>`;
    addClickEvent(node); /// 注册点击事件
    addContextmenuEvent(node); //// 添加右键事件
    floatBlock.appendChild(node); /// 追加元素
    createFloatButtonStyle(); /// 追加元素的样式
    document.body.appendChild(floatBlock); /// 追加到 body 元素
  },
};

/**声明一个点击事件 */
function addClickEvent(node: HTMLElement) {
  const _t = floatButton;
  node.addEventListener(
    'click',
    e => {
      const target: HTMLElement = e.target as HTMLElement;
      /// 取消当前的所有动作
      const __hide = () => _t.hide();
      //  暂停操作
      const __stop = () => (
        (data.positiveStop = !0), _t.suspend(), message.suspendRefresh()
      );
      // 恢复状态
      const __restore = () => (
        (data.positiveStop = !1), _t.restore(), message.restoreRefresh()
      );
      if (target!.innerHTML === _t.textShow[0]) {
        __hide();
      } else if (target.innerHTML === _t.textShow[1]) {
        __stop();
      } else if (target.innerHTML == _t.textShow[2]) {
        __restore();
      } else if (target.id === id) {
        /// 不知道为什么，在实际使用中，点击会触发到这里，在测试的时候每次都触发的是 span 元素
        const y = e.offsetY;
        /// 这个判断可有可无
        if (y > 1 && y < target.offsetHeight - 1) {
          if (e.offsetX < Math.floor(target.offsetWidth / 2)) __hide();
          else if (data.positiveStop) __restore();
          else __stop();
        }
      }
    },
    {
      signal: _t.controller.signal,
    },
  );
}

/** 添加右键事件，屏蔽右键默认事件 */
function addContextmenuEvent(node: HTMLElement) {
  node.addEventListener('contextmenu', e => {
    e.stopImmediatePropagation();
    e.preventDefault();
    return false;
  });
}

/** 添加元素的样式到 head */
function createFloatButtonStyle() {
  const buttonStyle = document.createElement('style');
  buttonStyle.setAttribute('data-ip', id);
  /**
   * darken
   * color-dodge
   * color-burn
   */
  buttonStyle.innerText = `
      ${name}#${id} {
          position:fixed;
          z-index:10000;
          right:20px;
          top:10%;
          width: 100px;
          height: 24px;
          line-height: 24px;
          font-size: 16px;
          font-weight: 900;
          text-align:center;
          color: transparent;
          box-shadow: 1px 1px 8px #0009, -1px -1px 8px #fff6;
          transition: all  0.8s, visibility 0s;
          visibility: visible;
          visibility: hidden;

          &::before {
            // mix-blend-mode: color-dodge;
            content:'';
            background: #0d06;
            position:absolute;
            top:0px;
            left:0px;
            width:100%;
            height:100%;
            z-index:0;
            animation: var(--refreshAnimationDelay) linear 0s infinite backwards  refreshFloatButtonBefore;
          } 

          &:hover {
            transition: all  0.4s;
            box-shadow: 1px 1px 12px #ff06, -1px -1px 12px #0ff6;
          }
          
          & float-item {
            color: transparent;
            background-color: transparent;
            font-size: 16px;
            background-clip: text;
            display: inline-block;
            width: calc(50% - 1px);
            -webkit-user-select: none;
            user-select: none;
            cursor: pointer;
            &:nth-child(1) {
              background-image: linear-gradient(to left ,#f0f,#000);
              border-right:  2px;
              border-image: linear-gradient(to top, transparent 20%, #f0f, transparent 80%)  2 / 0px 2px 0px 0px   stretch;
            }

            &:nth-child(2) {
              background-image: linear-gradient(to left , #f00,#f0f);
            }
          }
        }
          
        #${id},#${id}::before {
          border-radius: 24px;
        }

        @keyframes refreshFloatButtonBefore {
          0% {
             clip-path: inset(0% 100% 0% 0% round 0 24px 24px 0);
          }

          100% {
             clip-path: inset(0% 0% 0% 0% round 0 24px  24px 0);   
          }
        }
        `
    .replace(/\n/gm, '')
    .replace(/\s{3,}/gm, ' ');

  document.head.appendChild(buttonStyle);
}

/** 切换底部移动背景的动画状态
 * @param {boolean} [pause=true]  默认为让动画停止（true）
 */

function changeAnimationState(pause: boolean = true) {
  const styles = document.styleSheets;
  const styleLength = styles.length - 1;
  for (let i = styleLength; i > -1; i--) {
    const ip = (styles[i].ownerNode as HTMLElement)!.dataset['ip'];
    if (ip && ip === id) {
      (
        (styles[i].cssRules[0] as CSSStyleRule).cssRules[0] as CSSStyleRule
      ).style.animationPlayState = pause ? 'paused' : 'running';
      break;
    }
  }
}
