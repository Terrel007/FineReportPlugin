/**
 * Created by ali13 on 2016/8/11.
 */
(function ($) {
    FS.THEME = $.extend(true, FS.THEME, {
        config4navigation: {
            onBeforeInit:function(){
                var self=this;
                var childNodes=$("#fs-frame-navi").children();
                $("#fs-frame-navi").empty();
                $("#fs-frame-navi").append(childNodes[2]).append(childNodes[0]).append(childNodes[1]);
                $('#fs-frame-search').remove();
                $('<div id="fs-frame-search"><input/><i class="icon-navi-search"></i><div class="search-result-wrapper"></div></div>').appendTo($('#fs-frame-header'));
            },
            onAfterInit: function () {
                var self = this;
                //$('#fs-frame-search').remove();
                $('#fs-frame-search').find('input').attr('placeholder','搜索内容').insertBefore($('.icon-navi-search'));
                var $reg = $('#fs-frame-reg');
                if ($reg.length > 0) {
                    $reg.remove();
                }
                $.ajax({
                    url: FR.servletURL + "?op=fs_main&cmd=module_getrootreports",
                    type: 'POST',
                    data: {id: -1},
                    success: function (res, status) {
                        var nodes = $.parseJSON(res);
                        $.ajax({
                            url: FR.servletURL + "?op=fs_main&cmd=getmoduleitems",
                            type: 'POST',
                            async: false,
                            data: {id: 1},
                            success: function(res){
                                nodes.push($.parseJSON(res));
                            }
                        });
                        var $ul = $('<ul class="node-navi"/>').appendTo($('#fs-frame-header'));
                        $.each(nodes, function (index, root) {
                            var $node = $('<li class="node-navi-li"/>').appendTo($ul);
                            $('<div/>').text(root.text)
                                .appendTo($node)
                                .click(function () {
                                        if($node.hasClass('node-select')){
                                            return;
                                        }
                                        $ul.find('.node-select').removeClass('node-select');
                                        $node.addClass('node-select');
                                        var $dropdown = $(this).data('DATA');
                                        if (!$dropdown) {
                                            $dropdown = $('<div class="node-pane"/>').appendTo($node);
                                            $(this).data('DATA', $dropdown);
                                            var $pane = $('<div class="node-pane-inner"/>')
                                                .css({
                                                    'max-height': document.body.clientHeight - 90
                                                }).appendTo($dropdown);
                                            if (root.hasChildren && root.ChildNodes) {
                                                var $other = $('<div class="node-wrapper"/>').appendTo($pane);
                                                $.each(root.ChildNodes, function (index, child) {
                                                    if (child.hasChildren) {
                                                        var $w = $('<div class="node-wrapper"/>').appendTo($pane);
                                                        $('<div class="node-title"/>').text(child.text).appendTo($w);
                                                        var childs = [];
                                                        _collectAllChildNodes(child, childs);
                                                        $.each(childs, function (i, n) {
                                                            _createItem(n, $dropdown, $node).appendTo($w);
                                                        });
                                                    } else {
                                                        _createItem(child, $dropdown, $node).appendTo($other);
                                                    }
                                                });
                                            } else {
                                                return;
                                            }
                                        }
                                        $dropdown.fadeIn('fast');
                                        $(document).bind('mouseover.nodepane', function (e) {
                                            var $t = $(e.target);
                                            if ($t.closest('.node-pane').length <= 0) {
                                                $node.removeClass('node-select');
                                                $dropdown.fadeOut('fast');
                                                $(document).unbind('mouseover.nodepane');
                                            }
                                        });
                                    }
                                );
                        });
                    }
                });
            }
        },
        config4frame: {
            west: {
                width: 0
            }
        }
    });
    var _createItem = function (node, $pane, $node) {
        return $('<a href="#"/>').text(node.text)
            .click(function () {
                FS.tabPane.addItem(node);
                $node.removeClass('node-select');
                $pane.hide();
                $(document).unbind('mousedown.nodepane');
            });
    };
    var _collectAllChildNodes = function (node, childs) {
        var self = this;
        if (!node.ChildNodes) {
            return;
        }
        $.each(node.ChildNodes, function (index, child) {
            if (child.hasChildren) {
                _collectAllChildNodes(child, childs);
            } else {
                childs.push(child);
            }
        });
    };
})(jQuery);