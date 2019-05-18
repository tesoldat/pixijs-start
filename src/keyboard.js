/* exported KeyBoard */

class KeyBoard {
  constructor (setup = {}) {
    let keyMap = this.loadKeyMap();
    this.keyCodeMap = keyMap.keyCodeMap;
    this.codeKeyMap = keyMap.codeKeyMap;
    this.loadSetup(setup); // {A: }
    this.downMap = new Map();
    window.addEventListener(
      'keydown', this.keyDown.bind(this), false
    );
    window.addEventListener(
      'keyup', this.keyUp.bind(this), false
    );
  }

  loadSetup (setup) {
    this.setup = setup;
  }

  keyDown (event) {
    if (this.codeKeyMap.hasOwnProperty(event.keyCode)) {
      let sKey = this.codeKeyMap[event.keyCode];
      if (this.setup.hasOwnProperty(sKey) && !this.downMap.has(sKey)) {
        this.downMap.set(sKey, null);
        this.setup[sKey].down();
      }
    }
  }
  keyUp (event) {
    if (this.codeKeyMap.hasOwnProperty(event.keyCode)) {
      let sKey = this.codeKeyMap[event.keyCode];
      if (this.setup.hasOwnProperty(sKey) && this.downMap.has(sKey)) {
        this.downMap.delete(sKey);
        this.setup[sKey].up();
      }
    }
  }
  loadKeyMap () {
    let keyCodeMap = {
      BACK: 8, // 退格键
      TAB: 9, // TAB键
      RETURN: 13, // 回车键
      SHIFT: 16, // Shift键
      CONTROL: 17, // Ctrl键
      MENU: 18, // Alt键
      PAUSE: 19, // Pause Break键
      CAPITAL: 20, // Caps Lock键
      SPACE: 32, // 空格键
      PRIOR: 33, // Page Up
      NEXT: 34, // Page Down
      END: 35, // End键
      HOME: 36, // Home键
      LEFT: 37, // 方向键:←
      UP: 38, // 方向键:↑
      RIGHT: 39, // 方向键:→
      DOWN: 40, // 方向键:↓
      INSERT: 45, // Insert键
      DELETE: 46, // Delete键

      // 字母表
      A: 65,
      B: 66,
      C: 67,
      D: 68,
      E: 69,
      F: 70,
      G: 71,
      H: 72,
      I: 73,
      J: 74,
      K: 75,
      L: 76,
      M: 77,
      N: 78,
      O: 79,
      P: 80,
      Q: 81,
      R: 82,
      S: 83,
      T: 84,
      U: 85,
      V: 86,
      W: 87,
      X: 88,
      Y: 89,
      Z: 90,

      LWIN: 91, // 左徽标键
      RWIN: 92, // 右徽标键
      APPS: 93, // 鼠标右键快捷键

      NUMPAD0: 96, // 小键盘0
      NUMPAD1: 97, // 小键盘1
      NUMPAD2: 98, // 小键盘2
      NUMPAD3: 99, // 小键盘3
      NUMPAD4: 100, // 小键盘4
      NUMPAD5: 101, // 小键盘5
      NUMPAD6: 102, // 小键盘6
      NUMPAD7: 103, // 小键盘7
      NUMPAD8: 104, // 小键盘8
      NUMPAD9: 105, // 小键盘9
      DECIMAL: 110, // 小键盘.
      PLUS: 106, // 小键盘*
      MULTIPLY: 107, // 小键盘+
      SUBTRACT: 109, // 小键盘-
      DIVIDE: 111, // 小键盘/

      F1: 112, // F1键
      F2: 113, // F2键
      F3: 114, // F3键
      F4: 115, // F4键
      F5: 116, // F5键
      F6: 117, // F6键
      F7: 118, // F7键
      F8: 119, // F8键
      F9: 120, // F9键
      F10: 121, // F10键
      F11: 122, // F11键
      F12: 123, // F12键

      NUMLOCK: 144, // Num Lock键
      SCROLL: 145 // Scroll Lock键
    };
    let codeKeyMap = {};
    let keys = Object.keys(keyCodeMap);
    keys.forEach((key) => {
      let code = keyCodeMap[key];
      codeKeyMap[code] = key;
    });
    return {
      'codeKeyMap': codeKeyMap,
      'keyCodeMap': keyCodeMap
    };
  }
};
