import { LoginManager } from "./spec/lib";
import { CreatedUser, Search, Login } from "./spec/Users";
import { Users } from "../src/models";

describe('initial database', () => {

    it('should clean all Database', (done) => {

        Users.clean();
        done();

    });

});

describe('lib unitest', () => {

    it("should 檢查Token", LoginManager.getFreshToken);

});

describe('新增會員測試', () => {

  it('should 建立男性會員', CreatedUser.man_user);

  it('should 建立女性會員', CreatedUser.girl_user);

//  it('should 取回會員搜尋列表', Search.list);
//
//  it('should 取回會員詳細資料', Search.detail);
//
//  it('should 會員登入', Login.admin_login);

});

