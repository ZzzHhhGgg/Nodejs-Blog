function serializeToJson(form) {
    var result = {};
    //获取表单内容，以数据呈现
    var f = form.serializeArray();
    f.forEach(item => {
        result[item.name] = item.value;
    });
    return result;
}