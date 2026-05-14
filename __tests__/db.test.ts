import { Board, Page, User } from "@/app/db";
import { time } from "console";
import { ValidationError } from "sequelize";

describe("Database", () => {
  const userId = `test_${+new Date()}`;
  it("creates a user", async () => {
    const newUser = User.build({
      clerkId: userId,
      username: "test account",
      email: "testemail@example.com",
    });
    try {
      await newUser.save();
      const checkUser = await User.findByPk(userId);
      expect(checkUser).toBeTruthy();
      expect(checkUser?.clerkId).toBe(userId);
    } catch (e) {
      if (e instanceof ValidationError) {
        fail(e.message);
      }
      fail("error occured");
    }
  });

  it("Creates a board", async () => {
    const newBoard = Board.build({
      title: "New Board",
      owner: userId,
    });
    try {
      await newBoard.save();
      const checkBoard = await Board.findOne({
        where: {
          title: "New Board",
          owner: userId,
        },
      });
      expect(checkBoard).toBeTruthy();
    } catch (e) {
      if (e instanceof ValidationError) {
        fail(e.message);
      }
      fail("error occured");
    }
  });

  it("adds a user as a collaborator", async () => {
    const checkBoard = await Board.findOne({
      where: {
        title: "New Board",
        owner: userId,
      },
    });
    expect(checkBoard).toBeTruthy();
    if (!checkBoard) return;
    await checkBoard.addCollaborator(userId);

    const checkUser = await User.findByPk(userId, {
      include: [User.associations.boards],
    });
    expect(checkUser).toBeTruthy();
    if (!checkUser) return;
    expect(checkUser.clerkId).toBe(userId);
    expect(checkUser.boards).toBeTruthy();
    expect(checkUser.boards!.length).toBeGreaterThanOrEqual(1);
    expect(checkUser.boards![0].id).toEqual(checkBoard.id);
  });

  it("adds a page to the board", async () => {
    const checkBoard = await Board.findOne({
      where: {
        title: "New Board",
        owner: userId,
      },
    });
    expect(checkBoard).toBeTruthy();
    if (!checkBoard) return;
    const page = Page.build({ name: "Name of Page", boardId: checkBoard.id });
    await page.save();

    const checkPage = await Page.findOne({
      where: { boardId: checkBoard.id },
      include: [Page.associations.board],
    });
    expect(checkPage).toBeTruthy();
    if (!checkPage) return;
    expect(checkPage.boardId).toBe(checkBoard.id);
    expect(checkPage.board).toBeTruthy();
    expect(checkPage.board.id).toEqual(checkBoard.id);
  });

  afterAll(async () => {
    await User.destroy({
      where: {
        clerkId: userId,
      },
    });
    const checkUser = await User.findByPk(userId);
    expect(checkUser).toBeFalsy();
    const checkBoard = await Board.findAll({
      where: {
        owner: userId,
      },
    });
    expect(checkBoard.length).toEqual(0);
  });
});
