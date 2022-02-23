const index = require("./../index");
const utils = require("./../utils/fileUtils");

describe("Read And Filter Directory function", () => {
  jest
    .spyOn(utils, "readDirectory")
    .mockResolvedValue(["beverages.txt", "fruits.txt", "vegetables.txt"]);

  it("should return an object with file name as key and array of content", async () => {
    jest
      .spyOn(utils, "readFiles")
      .mockResolvedValueOnce("bev1\r\nbev2")
      .mockResolvedValueOnce("fruit1\r\nfruit2")
      .mockResolvedValueOnce("veg1\r\nveg2\r\nveg3");

    const readAllFiles = await index.readAllFilesInDir("seed");
    expect(readAllFiles).toStrictEqual({
      beverages: ["bev1", "bev2"],
      fruits: ["fruit1", "fruit2"],
      vegetables: ["veg1", "veg2", "veg3"],
    });
  });

  it("should return an object with file name as key and array of contents with the firstchar filter applied", async () => {
    jest
      .spyOn(utils, "readFiles")
      .mockResolvedValueOnce("bev1\r\nbev2\r\nnotbev3")
      .mockResolvedValueOnce("fruit1\r\nfruit2\r\nbanana")
      .mockResolvedValueOnce("veg1\r\nveg2\r\nveg3\r\nbrinjal");

    const readAllFiles = await index.readAllFilesInDir("seed", "b");
    expect(readAllFiles).toStrictEqual({
      beverages: ["bev1", "bev2"],
      fruits: ["banana"],
      vegetables: ["brinjal"],
    });
  });
});

describe("Read single file", () => {
  jest.spyOn(utils, "readFiles").mockResolvedValue("bev1\r\nbev2\r\ncoca cola");

  it("should return an object with key as filename and value as contents", async () => {
    const readSingleFile = await index.readFile("seed", "beverages");
    expect(readSingleFile).toStrictEqual(["bev1", "bev2", "coca cola"]);
  });

  it("should return an object with key as filename and value as contents with filters", async () => {
    const readSingleFile = await index.readFile("seed", "beverages","b");
    expect(readSingleFile).toStrictEqual(["bev1", "bev2"]);
  });
});

describe('Append to a file',()=>{


    it("should append values correctly and return an object",async () => {
        jest.spyOn(utils, "readFiles").mockResolvedValueOnce("bev1\r\nbev2\r\ncoca cola").mockResolvedValueOnce("bev1\r\nbev2\r\ncoca cola\r\nbev3\r\nbev4")
        jest.spyOn(utils,"writeToFile").mockResolvedValue()
        const data = await index.appendToFile("seed","beverages",["bev3","bev4"])

        expect(data).toStrictEqual({
            beverages: ["bev1","bev2","coca cola","bev3","bev4"]
        })
    })

})

// describe('Remove data from a file not starting from a particular character',()=>{

// })
