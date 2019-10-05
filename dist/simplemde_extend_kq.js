//增加设置标签H1-H6




function SimpleToggleHeading(editor, size, direction) {
    var cm = editor.codemirror;
    if (/editor-preview-active/.test(cm.getWrapperElement().lastChild.className))
        return;
    var startPoint = cm.getCursor("start");
    var endPoint = cm.getCursor("end");
    for (var i = startPoint.line; i <= endPoint.line; i++) {
        (function (i) {
            var text = cm.getLine(i);
            var currHeadingLevel = text.search(/[^#]/);
            console.log(currHeadingLevel);


            if (direction !== undefined) {
                if (currHeadingLevel <= 0) {
                    if (direction == "bigger") {
                        text = "###### " + text;
                    } else {
                        text = "# " + text;
                    }
                } else if (currHeadingLevel == 6 && direction == "smaller") {
                    text = text.substr(7);
                } else if (currHeadingLevel == 1 && direction == "bigger") {
                    text = text.substr(2);
                } else {
                    if (direction == "bigger") {
                        text = text.substr(1);
                    } else {
                        text = "#" + text;
                    }
                }
            } else {
                if (size == 1) {
                    if (currHeadingLevel <= 0) {
                        text = "# " + text;
                    } else if (currHeadingLevel == size) {
                        text = text.substr(currHeadingLevel + 1);
                    } else {
                        text = "# " + text.substr(currHeadingLevel + 1);
                    }
                } else if (size == 2) {
                    if (currHeadingLevel <= 0) {
                        text = "## " + text;
                    } else if (currHeadingLevel == size) {
                        text = text.substr(currHeadingLevel + 1);
                    } else {
                        text = "## " + text.substr(currHeadingLevel + 1);
                    }
                } else {
                    if (currHeadingLevel == size) {
                        text = text.substr(currHeadingLevel + 1);
                    } else {

                        text = _repeatStringNumTimes("#", size) + " " + text.substr(currHeadingLevel + 1);
                    }
                }
            }

            cm.replaceRange(text, {
                line: i,
                ch: 0
            }, {
                line: i,
                ch: 99999999999999
            });
        })(i);
    }
    cm.focus();
}

function _repeatStringNumTimes(str, num) {
    let repeatStr = '';
    for (let i = 0; i < num; i++) {
        repeatStr += str;
    }
    return repeatStr;
}


function SimpletoggleAlignment(editor, type) {
    if (/editor-preview-active/.test(editor.codemirror.getWrapperElement().lastChild.className))
        return;

    end_chars = '';
    var cm = editor.codemirror;

    type = type || 'left';
    var text;
    var start = '';
    var end = '';

    var startPoint = cm.getCursor("start");
    var endPoint = cm.getCursor("end");
    text = cm.getSelection();
    //判断是否存在
    var p_reg=/\<p\s.*?\>(.*)\<\/p\>/;
    if(p_reg.test(text)){
        //已经存在了。
        text = cm.getLine(startPoint.line);
        start = text.slice(0, startPoint.ch);
        end = text.slice(startPoint.ch);
        end = end.replace(/\<p\s.*?\>/, "");
        end = end.replace(/\<\/p\>/, "");

        cm.replaceRange(start + end, {
            line: startPoint.line,
            ch: 0
        }, {
            line: startPoint.line,
            ch: 99999999999999
        });

        console.log(start);
        console.log(end);
    }else
    {
        if (type == 'left') {
            text = "<p align=\"left\">" + text + "</p>";
        }
        if (type == 'center') {
            text = "<p align=\"center\">" + text + "</p>";
        }
        if (type == 'right') {
            text = "<p align=\"right\">" + text + "</p>";
        }

        cm.replaceSelection(start + text + end);
        endPoint.ch = startPoint.ch + text.length;
    }


    cm.setSelection(startPoint, endPoint);
    cm.focus();


}

