
namespace Utility {
    import TileBaseType   = Types.TileBaseType;
    import TileObjectType = Types.TileObjectType;

    type TileObjectTypeAndPlayerIndex = {
        tileObjectType: TileObjectType;
        playerIndex   : number;
    }

    const TILE_BASE_IMAGE_SOURCES: Readonly<string[]>[] = [
        /*   0 */ [],

        ////////// plain * 1 //////////
        /*   1 */ ["c01_t01_s01_f01",],

        ////////// river * 16 //////////
        /*   2 */ ["c01_t02_s01_f01",],
        /*   3 */ ["c01_t02_s02_f01",],
        /*   4 */ ["c01_t02_s03_f01",],
        /*   5 */ ["c01_t02_s04_f01",],
        /*   6 */ ["c01_t02_s05_f01",],
        /*   7 */ ["c01_t02_s06_f01",],
        /*   8 */ ["c01_t02_s07_f01",],
        /*   9 */ ["c01_t02_s08_f01",],
        /*  10 */ ["c01_t02_s09_f01",],
        /*  11 */ ["c01_t02_s10_f01",],
        /*  12 */ ["c01_t02_s11_f01",],
        /*  13 */ ["c01_t02_s12_f01",],
        /*  14 */ ["c01_t02_s13_f01",],
        /*  15 */ ["c01_t02_s14_f01",],
        /*  16 */ ["c01_t02_s15_f01",],
        /*  17 */ ["c01_t02_s16_f01",],

        ////////// sea * 47 //////////
        /*  18 */ ["c01_t03_s01_f01", "c01_t03_s01_f02", "c01_t03_s01_f03", "c01_t03_s01_f04", "c01_t03_s01_f03", "c01_t03_s01_f02",],
        /*  19 */ ["c01_t03_s02_f01", "c01_t03_s02_f02", "c01_t03_s02_f03", "c01_t03_s02_f04", "c01_t03_s02_f03", "c01_t03_s02_f02",],
        /*  20 */ ["c01_t03_s03_f01", "c01_t03_s03_f02", "c01_t03_s03_f03", "c01_t03_s03_f04", "c01_t03_s03_f03", "c01_t03_s03_f02",],
        /*  21 */ ["c01_t03_s04_f01", "c01_t03_s04_f02", "c01_t03_s04_f03", "c01_t03_s04_f04", "c01_t03_s04_f03", "c01_t03_s04_f02",],
        /*  22 */ ["c01_t03_s05_f01", "c01_t03_s05_f02", "c01_t03_s05_f03", "c01_t03_s05_f04", "c01_t03_s05_f03", "c01_t03_s05_f02",],
        /*  23 */ ["c01_t03_s06_f01", "c01_t03_s06_f02", "c01_t03_s06_f03", "c01_t03_s06_f04", "c01_t03_s06_f03", "c01_t03_s06_f02",],
        /*  24 */ ["c01_t03_s07_f01", "c01_t03_s07_f02", "c01_t03_s07_f03", "c01_t03_s07_f04", "c01_t03_s07_f03", "c01_t03_s07_f02",],
        /*  25 */ ["c01_t03_s08_f01", "c01_t03_s08_f02", "c01_t03_s08_f03", "c01_t03_s08_f04", "c01_t03_s08_f03", "c01_t03_s08_f02",],
        /*  26 */ ["c01_t03_s09_f01", "c01_t03_s09_f02", "c01_t03_s09_f03", "c01_t03_s09_f04", "c01_t03_s09_f03", "c01_t03_s09_f02",],
        /*  27 */ ["c01_t03_s10_f01", "c01_t03_s10_f02", "c01_t03_s10_f03", "c01_t03_s10_f04", "c01_t03_s10_f03", "c01_t03_s10_f02",],
        /*  28 */ ["c01_t03_s11_f01", "c01_t03_s11_f02", "c01_t03_s11_f03", "c01_t03_s11_f04", "c01_t03_s11_f03", "c01_t03_s11_f02",],
        /*  29 */ ["c01_t03_s12_f01", "c01_t03_s12_f02", "c01_t03_s12_f03", "c01_t03_s12_f04", "c01_t03_s12_f03", "c01_t03_s12_f02",],
        /*  30 */ ["c01_t03_s13_f01", "c01_t03_s13_f02", "c01_t03_s13_f03", "c01_t03_s13_f04", "c01_t03_s13_f03", "c01_t03_s13_f02",],
        /*  31 */ ["c01_t03_s14_f01", "c01_t03_s14_f02", "c01_t03_s14_f03", "c01_t03_s14_f04", "c01_t03_s14_f03", "c01_t03_s14_f02",],
        /*  32 */ ["c01_t03_s15_f01", "c01_t03_s15_f02", "c01_t03_s15_f03", "c01_t03_s15_f04", "c01_t03_s15_f03", "c01_t03_s15_f02",],
        /*  33 */ ["c01_t03_s16_f01", "c01_t03_s16_f02", "c01_t03_s16_f03", "c01_t03_s16_f04", "c01_t03_s16_f03", "c01_t03_s16_f02",],
        /*  34 */ ["c01_t03_s17_f01", "c01_t03_s17_f02", "c01_t03_s17_f03", "c01_t03_s17_f04", "c01_t03_s17_f03", "c01_t03_s17_f02",],
        /*  35 */ ["c01_t03_s18_f01", "c01_t03_s18_f02", "c01_t03_s18_f03", "c01_t03_s18_f04", "c01_t03_s18_f03", "c01_t03_s18_f02",],
        /*  36 */ ["c01_t03_s19_f01", "c01_t03_s19_f02", "c01_t03_s19_f03", "c01_t03_s19_f04", "c01_t03_s19_f03", "c01_t03_s19_f02",],
        /*  37 */ ["c01_t03_s20_f01", "c01_t03_s20_f02", "c01_t03_s20_f03", "c01_t03_s20_f04", "c01_t03_s20_f03", "c01_t03_s20_f02",],
        /*  38 */ ["c01_t03_s21_f01", "c01_t03_s21_f02", "c01_t03_s21_f03", "c01_t03_s21_f04", "c01_t03_s21_f03", "c01_t03_s21_f02",],
        /*  39 */ ["c01_t03_s22_f01", "c01_t03_s22_f02", "c01_t03_s22_f03", "c01_t03_s22_f04", "c01_t03_s22_f03", "c01_t03_s22_f02",],
        /*  40 */ ["c01_t03_s23_f01", "c01_t03_s23_f02", "c01_t03_s23_f03", "c01_t03_s23_f04", "c01_t03_s23_f03", "c01_t03_s23_f02",],
        /*  41 */ ["c01_t03_s24_f01", "c01_t03_s24_f02", "c01_t03_s24_f03", "c01_t03_s24_f04", "c01_t03_s24_f03", "c01_t03_s24_f02",],
        /*  42 */ ["c01_t03_s25_f01", "c01_t03_s25_f02", "c01_t03_s25_f03", "c01_t03_s25_f04", "c01_t03_s25_f03", "c01_t03_s25_f02",],
        /*  43 */ ["c01_t03_s26_f01", "c01_t03_s26_f02", "c01_t03_s26_f03", "c01_t03_s26_f04", "c01_t03_s26_f03", "c01_t03_s26_f02",],
        /*  44 */ ["c01_t03_s27_f01", "c01_t03_s27_f02", "c01_t03_s27_f03", "c01_t03_s27_f04", "c01_t03_s27_f03", "c01_t03_s27_f02",],
        /*  45 */ ["c01_t03_s28_f01", "c01_t03_s28_f02", "c01_t03_s28_f03", "c01_t03_s28_f04", "c01_t03_s28_f03", "c01_t03_s28_f02",],
        /*  46 */ ["c01_t03_s29_f01", "c01_t03_s29_f02", "c01_t03_s29_f03", "c01_t03_s29_f04", "c01_t03_s29_f03", "c01_t03_s29_f02",],
        /*  47 */ ["c01_t03_s30_f01", "c01_t03_s30_f02", "c01_t03_s30_f03", "c01_t03_s30_f04", "c01_t03_s30_f03", "c01_t03_s30_f02",],
        /*  48 */ ["c01_t03_s31_f01", "c01_t03_s31_f02", "c01_t03_s31_f03", "c01_t03_s31_f04", "c01_t03_s31_f03", "c01_t03_s31_f02",],
        /*  49 */ ["c01_t03_s32_f01", "c01_t03_s32_f02", "c01_t03_s32_f03", "c01_t03_s32_f04", "c01_t03_s32_f03", "c01_t03_s32_f02",],
        /*  50 */ ["c01_t03_s33_f01", "c01_t03_s33_f02", "c01_t03_s33_f03", "c01_t03_s33_f04", "c01_t03_s33_f03", "c01_t03_s33_f02",],
        /*  51 */ ["c01_t03_s34_f01", "c01_t03_s34_f02", "c01_t03_s34_f03", "c01_t03_s34_f04", "c01_t03_s34_f03", "c01_t03_s34_f02",],
        /*  52 */ ["c01_t03_s35_f01", "c01_t03_s35_f02", "c01_t03_s35_f03", "c01_t03_s35_f04", "c01_t03_s35_f03", "c01_t03_s35_f02",],
        /*  53 */ ["c01_t03_s36_f01", "c01_t03_s36_f02", "c01_t03_s36_f03", "c01_t03_s36_f04", "c01_t03_s36_f03", "c01_t03_s36_f02",],
        /*  54 */ ["c01_t03_s37_f01", "c01_t03_s37_f02", "c01_t03_s37_f03", "c01_t03_s37_f04", "c01_t03_s37_f03", "c01_t03_s37_f02",],
        /*  55 */ ["c01_t03_s38_f01", "c01_t03_s38_f02", "c01_t03_s38_f03", "c01_t03_s38_f04", "c01_t03_s38_f03", "c01_t03_s38_f02",],
        /*  56 */ ["c01_t03_s39_f01", "c01_t03_s39_f02", "c01_t03_s39_f03", "c01_t03_s39_f04", "c01_t03_s39_f03", "c01_t03_s39_f02",],
        /*  57 */ ["c01_t03_s40_f01", "c01_t03_s40_f02", "c01_t03_s40_f03", "c01_t03_s40_f04", "c01_t03_s40_f03", "c01_t03_s40_f02",],
        /*  58 */ ["c01_t03_s41_f01", "c01_t03_s41_f02", "c01_t03_s41_f03", "c01_t03_s41_f04", "c01_t03_s41_f03", "c01_t03_s41_f02",],
        /*  59 */ ["c01_t03_s42_f01", "c01_t03_s42_f02", "c01_t03_s42_f03", "c01_t03_s42_f04", "c01_t03_s42_f03", "c01_t03_s42_f02",],
        /*  60 */ ["c01_t03_s43_f01", "c01_t03_s43_f02", "c01_t03_s43_f03", "c01_t03_s43_f04", "c01_t03_s43_f03", "c01_t03_s43_f02",],
        /*  61 */ ["c01_t03_s44_f01", "c01_t03_s44_f02", "c01_t03_s44_f03", "c01_t03_s44_f04", "c01_t03_s44_f03", "c01_t03_s44_f02",],
        /*  62 */ ["c01_t03_s45_f01", "c01_t03_s45_f02", "c01_t03_s45_f03", "c01_t03_s45_f04", "c01_t03_s45_f03", "c01_t03_s45_f02",],
        /*  63 */ ["c01_t03_s46_f01", "c01_t03_s46_f02", "c01_t03_s46_f03", "c01_t03_s46_f04", "c01_t03_s46_f03", "c01_t03_s46_f02",],
        /*  64 */ ["c01_t03_s47_f01", "c01_t03_s47_f02", "c01_t03_s47_f03", "c01_t03_s47_f04", "c01_t03_s47_f03", "c01_t03_s47_f02",],

        ////////// beach * 36 //////////
        /*  65 */ ["c01_t04_s01_f01", "c01_t04_s01_f02", "c01_t04_s01_f03", "c01_t04_s01_f04", "c01_t04_s01_f03", "c01_t04_s01_f02",],
        /*  66 */ ["c01_t04_s02_f01", "c01_t04_s02_f02", "c01_t04_s02_f03", "c01_t04_s02_f04", "c01_t04_s02_f03", "c01_t04_s02_f02",],
        /*  67 */ ["c01_t04_s03_f01", "c01_t04_s03_f02", "c01_t04_s03_f03", "c01_t04_s03_f04", "c01_t04_s03_f03", "c01_t04_s03_f02",],
        /*  68 */ ["c01_t04_s04_f01", "c01_t04_s04_f02", "c01_t04_s04_f03", "c01_t04_s04_f04", "c01_t04_s04_f03", "c01_t04_s04_f02",],
        /*  69 */ ["c01_t04_s05_f01", "c01_t04_s05_f02", "c01_t04_s05_f03", "c01_t04_s05_f04", "c01_t04_s05_f03", "c01_t04_s05_f02",],
        /*  70 */ ["c01_t04_s06_f01", "c01_t04_s06_f02", "c01_t04_s06_f03", "c01_t04_s06_f04", "c01_t04_s06_f03", "c01_t04_s06_f02",],
        /*  71 */ ["c01_t04_s07_f01", "c01_t04_s07_f02", "c01_t04_s07_f03", "c01_t04_s07_f04", "c01_t04_s07_f03", "c01_t04_s07_f02",],
        /*  72 */ ["c01_t04_s08_f01", "c01_t04_s08_f02", "c01_t04_s08_f03", "c01_t04_s08_f04", "c01_t04_s08_f03", "c01_t04_s08_f02",],
        /*  73 */ ["c01_t04_s09_f01", "c01_t04_s09_f02", "c01_t04_s09_f03", "c01_t04_s09_f04", "c01_t04_s09_f03", "c01_t04_s09_f02",],
        /*  74 */ ["c01_t04_s10_f01", "c01_t04_s10_f02", "c01_t04_s10_f03", "c01_t04_s10_f04", "c01_t04_s10_f03", "c01_t04_s10_f02",],
        /*  75 */ ["c01_t04_s11_f01", "c01_t04_s11_f02", "c01_t04_s11_f03", "c01_t04_s11_f04", "c01_t04_s11_f03", "c01_t04_s11_f02",],
        /*  76 */ ["c01_t04_s12_f01", "c01_t04_s12_f02", "c01_t04_s12_f03", "c01_t04_s12_f04", "c01_t04_s12_f03", "c01_t04_s12_f02",],
        /*  77 */ ["c01_t04_s13_f01", "c01_t04_s13_f02", "c01_t04_s13_f03", "c01_t04_s13_f04", "c01_t04_s13_f03", "c01_t04_s13_f02",],
        /*  78 */ ["c01_t04_s14_f01", "c01_t04_s14_f02", "c01_t04_s14_f03", "c01_t04_s14_f04", "c01_t04_s14_f03", "c01_t04_s14_f02",],
        /*  79 */ ["c01_t04_s15_f01", "c01_t04_s15_f02", "c01_t04_s15_f03", "c01_t04_s15_f04", "c01_t04_s15_f03", "c01_t04_s15_f02",],
        /*  80 */ ["c01_t04_s16_f01", "c01_t04_s16_f02", "c01_t04_s16_f03", "c01_t04_s16_f04", "c01_t04_s16_f03", "c01_t04_s16_f02",],
        /*  81 */ ["c01_t04_s17_f01", "c01_t04_s17_f02", "c01_t04_s17_f03", "c01_t04_s17_f04", "c01_t04_s17_f03", "c01_t04_s17_f02",],
        /*  82 */ ["c01_t04_s18_f01", "c01_t04_s18_f02", "c01_t04_s18_f03", "c01_t04_s18_f04", "c01_t04_s18_f03", "c01_t04_s18_f02",],
        /*  83 */ ["c01_t04_s19_f01", "c01_t04_s19_f02", "c01_t04_s19_f03", "c01_t04_s19_f04", "c01_t04_s19_f03", "c01_t04_s19_f02",],
        /*  84 */ ["c01_t04_s20_f01", "c01_t04_s20_f02", "c01_t04_s20_f03", "c01_t04_s20_f04", "c01_t04_s20_f03", "c01_t04_s20_f02",],
        /*  85 */ ["c01_t04_s21_f01", "c01_t04_s21_f02", "c01_t04_s21_f03", "c01_t04_s21_f04", "c01_t04_s21_f03", "c01_t04_s21_f02",],
        /*  86 */ ["c01_t04_s22_f01", "c01_t04_s22_f02", "c01_t04_s22_f03", "c01_t04_s22_f04", "c01_t04_s22_f03", "c01_t04_s22_f02",],
        /*  87 */ ["c01_t04_s23_f01", "c01_t04_s23_f02", "c01_t04_s23_f03", "c01_t04_s23_f04", "c01_t04_s23_f03", "c01_t04_s23_f02",],
        /*  88 */ ["c01_t04_s24_f01", "c01_t04_s24_f02", "c01_t04_s24_f03", "c01_t04_s24_f04", "c01_t04_s24_f03", "c01_t04_s24_f02",],
        /*  89 */ ["c01_t04_s25_f01", "c01_t04_s25_f02", "c01_t04_s25_f03", "c01_t04_s25_f04", "c01_t04_s25_f03", "c01_t04_s25_f02",],
        /*  90 */ ["c01_t04_s26_f01", "c01_t04_s26_f02", "c01_t04_s26_f03", "c01_t04_s26_f04", "c01_t04_s26_f03", "c01_t04_s26_f02",],
        /*  91 */ ["c01_t04_s27_f01", "c01_t04_s27_f02", "c01_t04_s27_f03", "c01_t04_s27_f04", "c01_t04_s27_f03", "c01_t04_s27_f02",],
        /*  92 */ ["c01_t04_s28_f01", "c01_t04_s28_f02", "c01_t04_s28_f03", "c01_t04_s28_f04", "c01_t04_s28_f03", "c01_t04_s28_f02",],
        /*  93 */ ["c01_t04_s29_f01", "c01_t04_s29_f02", "c01_t04_s29_f03", "c01_t04_s29_f04", "c01_t04_s29_f03", "c01_t04_s29_f02",],
        /*  94 */ ["c01_t04_s30_f01", "c01_t04_s30_f02", "c01_t04_s30_f03", "c01_t04_s30_f04", "c01_t04_s30_f03", "c01_t04_s30_f02",],
        /*  95 */ ["c01_t04_s31_f01", "c01_t04_s31_f02", "c01_t04_s31_f03", "c01_t04_s31_f04", "c01_t04_s31_f03", "c01_t04_s31_f02",],
        /*  96 */ ["c01_t04_s32_f01", "c01_t04_s32_f02", "c01_t04_s32_f03", "c01_t04_s32_f04", "c01_t04_s32_f03", "c01_t04_s32_f02",],
        /*  97 */ ["c01_t04_s33_f01", "c01_t04_s33_f02", "c01_t04_s33_f03", "c01_t04_s33_f04", "c01_t04_s33_f03", "c01_t04_s33_f02",],
        /*  98 */ ["c01_t04_s34_f01", "c01_t04_s34_f02", "c01_t04_s34_f03", "c01_t04_s34_f04", "c01_t04_s34_f03", "c01_t04_s34_f02",],
        /*  99 */ ["c01_t04_s35_f01", "c01_t04_s35_f02", "c01_t04_s35_f03", "c01_t04_s35_f04", "c01_t04_s35_f03", "c01_t04_s35_f02",],
        /* 100 */ ["c01_t04_s36_f01", "c01_t04_s36_f02", "c01_t04_s36_f03", "c01_t04_s36_f04", "c01_t04_s36_f03", "c01_t04_s36_f02",],
    ];

    const TILE_OBJECT_IMAGE_SOURCES: Readonly<string[]>[] = [
        /*   0 */ [],

        ////////// road * 11 //////////
        /*   1 */ ["c02_t001_s01_f01",],
    ];

    export namespace IdConverter {
        export function getTileBaseType(tileBaseViewId: number): TileBaseType {
            // TODO
            return TileBaseType.Plain;
        }

        export function getTileObjectTypeAndPlayerIndex(tileObjectViewId: number): TileObjectTypeAndPlayerIndex {
            // TODO
            return {
                tileObjectType: TileObjectType.Empty,
                playerIndex   : 0,
            };
        }

        export function getTileBaseImageSource(tileBaseViewId: number, tickCount: number): string {
            const sources = TILE_BASE_IMAGE_SOURCES[tileBaseViewId];
            return sources[tickCount % sources.length];
        }
    }
}
