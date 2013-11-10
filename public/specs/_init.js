describe('Init', function() {
    it('gets index controller', function() {
        GetPathName = function(){return "/";}
        expect(GetController()).toBe("index");
    });
    it('gets proper class', function(){
        GetPathName = function(){return "/visualization";}
        expect(GetController()).toBe('visualization');
    });
});