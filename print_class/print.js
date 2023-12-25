// 打印
/***** iframe打印
 * @param dom            打印区域的id
 * @method options.afterprint 打印结束后回调
 * @method options.cancel 取消打印后回调
 *
 * **/
import styleEnum from '/styleEnum.js';

// 文档类型
const docts = {
    strict: 'strict',
    loose: 'loose',
    html5: 'html5',
    frameset: 'frameset'
};

class Print {
    constructor(options) {
        this.options = Object.assign(
            {
                hide: true,
                noPrint: '.no-print',
                docType: docts.html5
            },
            options
        );
        let { dom, docType, title } = this.options;
        this.title = title || '打印';
        this.docType = docType;
        // 打印区dom
        this.dom = dom instanceof HTMLElement ? dom : document.querySelector(dom);
        // 打印方法挂载对象
        this.frame = null;
        // 打印区样式表
        this.styleSheets = new Map();
        // this.dom中的所有元素节点的样式
        this.getAllEleStyle(this.dom);
        // 获取打印页面的doctype
        this.docType = this.getIframeDoctype();
        // 获取打印页面的head
        this.head = this.getIframeHeader();
        // 获取打印页面的body
        this.body = this.getIframeBody();
        // 构建并打印
        this.writeIframe();
    }
    // 遍历dom节点并获取dom节点被渲染过的所有样式，以生成打印样式表
    getAllEleStyle(dom) {
        var vm = this;
        this.styleSheets.set(dom.className, vm.getEleStaticStyle(dom));
        var getAllChildStyle = function (dom) {
            let nodes = dom.childNodes;
            for (var i = 0; i < nodes.length; i++) {
                var child = nodes[i];
                // 判断是否为指定类型节点
                if (child.nodeType == 1) {
                    vm.styleSheets.set(child.className, vm.getEleStaticStyle(child));
                }
                getAllChildStyle(child);
            }
        };
        getAllChildStyle(dom);
        return this.styleSheets;
    }
    // 获取某个元素的所有渲染样式
    getEleStaticStyle(element) {
        const allStyles = window.getComputedStyle(element);
        const style = new Map();
        for (var i of styleEnum) {
            if (typeof allStyles[i] !== 'undefined' && allStyles[i] !== '') {
                style.set(
                    i.replace(/[A-Z]/g, function (value) {
                        return '-' + value.toLocaleLowerCase();
                    }),
                    allStyles[i]
                );
            }
        }
        return style;
    }
    // 构建iframe文档头
    getIframeDoctype() {
        if (this.docType === docts.html5) {
            return '<!DOCTYPE html>';
        }
        var transitional = this.docType === docts.loose ? ' Transitional' : '';
        var dtd = this.docType === docts.loose ? 'loose' : 'strict';
        return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01${transitional}//EN" "http://www.w3.org/TR/html4/${dtd}.dtd">`;
    }
    // 构建Iframe整体样式
    getIframeHeader() {
        // 获取到当前页所有的外部样式表，看实际需要，可选
        let links = document.querySelectorAll('link'),
            link = '',
            style = '';
        [].forEach.call(links, function (item) {
            if (item.href.indexOf('.css') >= 0) {
                link += `<link type="text/css" rel="stylesheet" href="${item.href}" >`;
            }
        });
        //解析收集的样式，这里的样式是传递过来的打印区的样式
        this.styleSheets.forEach((val, key) => {
            style += `.${key}{`;
            val.forEach((value, name) => {
                style += `${name}:${value};`;
            });
            style += `}`;
        });
        style +=
            '<style>' +
            (this.options.noPrint ? this.options.noPrint : '.no-print') +
            '{display:none !important;}</style>';
        // 特指打印样式，可在这里实现打印内容分页 eg: h1 {page-break-after: always;}
        style += `<style>
        @media print {
            @page {
                margin: ${this.options.margin || '0 0 0 0'} !important;
                padding: ${this.options.padding || '0 0 0 0'} !important;
            }
            body {
                -webkit-print-color-adjust:exact !important;
                -moz-print-color-adjust:exact !important;
                -ms-print-color-adjust:exact !important;
                print-color-adjust:exact !important;
                padding-bottom: 10px !important;
            }
        }
        </style>`;
        return `<head><title>${this.title}</title>${link}<style type="text/css">${style}</style></head>`;
    }
    // 构建Iframe的内容区
    getIframeBody() {
        var inputs = this.dom.querySelectorAll('input');
        var textareas = this.dom.querySelectorAll('textarea');
        var selects = this.dom.querySelectorAll('select');
        for (var k = 0; k < inputs.length; k++) {
            if (inputs[k].type == 'checkbox' || inputs[k].type == 'radio') {
                if (inputs[k].checked == true) {
                    inputs[k].setAttribute('checked', 'checked');
                } else {
                    inputs[k].removeAttribute('checked');
                }
            } else if (inputs[k].type == 'text') {
                inputs[k].setAttribute('value', inputs[k].value);
            } else {
                inputs[k].setAttribute('value', inputs[k].value);
            }
        }
        for (var k2 = 0; k2 < textareas.length; k2++) {
            if (textareas[k2].type == 'textarea') {
                textareas[k2].innerHTML = textareas[k2].value;
            }
        }
        for (var k3 = 0; k3 < selects.length; k3++) {
            if (selects[k3].type == 'select-one') {
                var child = selects[k3].children;
                for (var i in child) {
                    if (child[i].tagName == 'OPTION') {
                        if (child[i].selected == true) {
                            child[i].setAttribute('selected', 'selected');
                        } else {
                            child[i].removeAttribute('selected');
                        }
                    }
                }
            }
        }
        return this.dom.outerHTML;
    }
    // iframe对象及挂载打印事件
    writeIframe() {
        var iframe = document.createElement('iframe');
        iframe.setAttribute('style', 'position:absolute;width:0;height:0;top:-10px;left:-10px;');
        iframe.setAttribute('id', 'printjs-iframe');
        iframe.setAttribute('src', new Date().getTime());
        document.body.append(iframe);
        iframe.onload = () => {
            iframe.contentDocument.write(`${this.docType}<html>${this.head}<body>${this.body}</body></html>`);
            // 如果打印区在源页面是隐藏的，需要在打印时显示出来
            if (this.options.hide) {
                iframe.contentWindow.document.getElementById(this.dom.id).style.display = 'block';
            }
            iframe.contentWindow.onbeforeprint = this.options.beforeprint;
            iframe.contentWindow.onafterprint = this.options.afterprint;
            this.toPrint(iframe.contentWindow);
            // 打印完移除事件
            setTimeout(function () {
                document.body.removeChild(iframe);
            }, 50);
        };
        this.frame = iframe;
    }
    toPrint(frameWindow) {
        var _t = this;
        try {
            setTimeout(function () {
                frameWindow.focus();
                try {
                    if (!frameWindow.document.execCommand('print', false, null)) {
                        frameWindow.print();
                    }
                } catch (e) {
                    frameWindow.print();
                }
                frameWindow.close();
                typeof _t.options.cancel === 'function' && _t.options.cancel();
                frameWindow.onbeforeprint = null;
                frameWindow.onafterprint = null;
            }, 10);
        } catch (err) {
            console.log('err', err);
        }
    }
}

export { Print };
