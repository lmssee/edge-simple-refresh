# publish info

已发现问题

- 低概率发生切回原页面时刷新异常问题
- ~~标签内刷新触发设立在 `body` 的自定义属性丢失~~
- 修复初始安装扩展后由于旧网页未加载本扩展脚本导致无法刷新

# 0.0.4 （10/01/2024）

上一次的发布不知道是触发了什么审核红线，导致给出 `1.1.5 Distinct Function & Value; Accurate Representation： The store listing for the extension is not informative of the extension\'s features and functionality` 的回馈信息。现调整部分内容，包括且不限于更改了产品的名称、说明等信息。
再次发布审核。

# 0.0.3 （10/01/2024）

- 修复属性丢失问题
- 修复关闭刷新后的副作用
- 由于 edge extension 审核机制，第一次提交被驳回，现再次提交审核

# 0.0.2 （8/24/2024）

- 去除生产环境的标志
- 优化刷新页面在被隐藏后再次回到页面状态不正确（低概率事件）
- 优化在刷新页面的一瞬间切换标签页导致的回页面状态丢失问题

# 0.0.1 （8/23/2024）

- 初始化
