export type SidebarItem =
  | { label: string; slug: string }
  | { label: string; collapsed?: boolean; items: SidebarItem[] };

const sidebar: SidebarItem[] = [
  {
    label: 'Player.sav',
    collapsed: true,
    items: [
      {
        label: 'Overview',
        slug: 'save-reference/player',
      },
      {
        label: 'DailyLog',
        slug: 'save-reference/player/daily-log',
      },
      {
        label: 'Demo',
        collapsed: true,
        items: [
          {
            label: 'Overview',
            slug: 'save-reference/player/demo',
          },
          {
            label: 'DemoEndTimeAry',
            slug: 'save-reference/player/demo/demo-end-time-ary',
          },
        ],
      },
      {
        label: 'Introduction',
        collapsed: true,
        items: [
          {
            label: 'Overview',
            slug: 'save-reference/player/introduction',
          },
          {
            label: 'FocusLeadingInfo',
            slug: 'save-reference/player/introduction/focus-leading-info',
          },
          {
            label: 'LectureInfo',
            slug: 'save-reference/player/introduction/lecture-info',
          },
        ],
      },
      {
        label: 'Liberation',
        collapsed: true,
        items: [
          {
            label: 'Overview',
            slug: 'save-reference/player/liberation',
          },
          {
            label: 'SeasonInfo',
            slug: 'save-reference/player/liberation/season-info',
          },
          {
            label: 'WishInfo',
            slug: 'save-reference/player/liberation/wish-info',
          },
        ],
      },
      {
        label: 'MiiEvent',
        collapsed: true,
        items: [
          {
            label: 'Overview',
            slug: 'save-reference/player/mii-event',
          },
          {
            label: 'GroupInfo',
            slug: 'save-reference/player/mii-event/group-info',
          },
          {
            label: 'MiiEventInfo',
            slug: 'save-reference/player/mii-event/mii-event-info',
          },
        ],
      },
      {
        label: 'MiiHistory',
        collapsed: true,
        items: [
          {
            label: 'Overview',
            slug: 'save-reference/player/mii-history',
          },
          {
            label: 'Info',
            slug: 'save-reference/player/mii-history/info',
          },
        ],
      },
      {
        label: 'News',
        collapsed: true,
        items: [
          {
            label: 'Overview',
            slug: 'save-reference/player/news',
          },
          {
            label: 'CasterMii',
            slug: 'save-reference/player/news/caster-mii',
          },
          {
            label: 'ContentMii',
            slug: 'save-reference/player/news/content-mii',
          },
          {
            label: 'IntervieweeMii',
            slug: 'save-reference/player/news/interviewee-mii',
          },
          {
            label: 'ItemInfo',
            slug: 'save-reference/player/news/item-info',
          },
          {
            label: 'TextOnlyMii',
            slug: 'save-reference/player/news/text-only-mii',
          },
        ],
      },
      {
        label: 'PhotoStudio',
        collapsed: true,
        items: [
          {
            label: 'Overview',
            slug: 'save-reference/player/photo-studio',
          },
          {
            label: 'Picture',
            slug: 'save-reference/player/photo-studio/picture',
          },
        ],
      },
      {
        label: 'Player',
        collapsed: true,
        items: [
          {
            label: 'Overview',
            slug: 'save-reference/player/player',
          },
          {
            label: 'BirthDay',
            slug: 'save-reference/player/player/birth-day',
          },
          {
            label: 'BondInfo',
            slug: 'save-reference/player/player/bond-info',
          },
          {
            label: 'BuildingInfo2',
            slug: 'save-reference/player/player/building-info2',
          },
          {
            label: 'BuildingShopItem',
            slug: 'save-reference/player/player/building-shop-item',
          },
          {
            label: 'ClothInfo',
            collapsed: true,
            items: [
              {
                label: 'Overview',
                slug: 'save-reference/player/player/cloth-info',
              },
              {
                label: 'OwnInfoArray',
                slug: 'save-reference/player/player/cloth-info/own-info-array',
              },
            ],
          },
          {
            label: 'ClothShopDailyItem',
            collapsed: true,
            items: [
              {
                label: 'Overview',
                slug: 'save-reference/player/player/cloth-shop-daily-item',
              },
              {
                label: 'DailyClothInfo',
                slug: 'save-reference/player/player/cloth-shop-daily-item/daily-cloth-info',
              },
              {
                label: 'DailyCoordinateInfo',
                slug: 'save-reference/player/player/cloth-shop-daily-item/daily-coordinate-info',
              },
            ],
          },
          {
            label: 'CommonDailyItem',
            slug: 'save-reference/player/player/common-daily-item',
          },
          {
            label: 'CoordinateInfo',
            collapsed: true,
            items: [
              {
                label: 'Overview',
                slug: 'save-reference/player/player/coordinate-info',
              },
              {
                label: 'OwnInfoArray',
                slug: 'save-reference/player/player/coordinate-info/own-info-array',
              },
            ],
          },
          {
            label: 'FloorInfo',
            slug: 'save-reference/player/player/floor-info',
          },
          {
            label: 'FoodInfo',
            slug: 'save-reference/player/player/food-info',
          },
          {
            label: 'FoodShopDailyItem',
            slug: 'save-reference/player/player/food-shop-daily-item',
          },
          {
            label: 'GoodsInfo2',
            slug: 'save-reference/player/player/goods-info2',
          },
          {
            label: 'GoodsShopItem',
            slug: 'save-reference/player/player/goods-shop-item',
          },
          {
            label: 'HabitInfo2',
            slug: 'save-reference/player/player/habit-info2',
          },
          {
            label: 'InteriorRoomStyleInfo',
            slug: 'save-reference/player/player/interior-room-style-info',
          },
          {
            label: 'ItemShopDisplayItem',
            slug: 'save-reference/player/player/item-shop-display-item',
          },
          {
            label: 'MarketUpdateInfo',
            collapsed: true,
            items: [
              {
                label: 'Overview',
                slug: 'save-reference/player/player/market-update-info',
              },
              {
                label: 'MarketCoordinateInfo',
                slug: 'save-reference/player/player/market-update-info/market-coordinate-info',
              },
            ],
          },
          {
            label: 'MiiBirthdayNews',
            slug: 'save-reference/player/player/mii-birthday-news',
          },
          {
            label: 'RoomStyleWeeklyItem',
            slug: 'save-reference/player/player/room-style-weekly-item',
          },
          {
            label: 'TroubleInfo',
            slug: 'save-reference/player/player/trouble-info',
          },
        ],
      },
      {
        label: 'Trial',
        slug: 'save-reference/player/trial',
      },
      {
        label: 'UGC',
        collapsed: true,
        items: [
          {
            label: 'Overview',
            slug: 'save-reference/player/ugc',
          },
          {
            label: 'Cloth',
            slug: 'save-reference/player/ugc/cloth',
          },
          {
            label: 'Editor',
            collapsed: true,
            items: [
              {
                label: 'Overview',
                slug: 'save-reference/player/ugc/editor',
              },
              {
                label: 'Sequence',
                slug: 'save-reference/player/ugc/editor/sequence',
              },
              {
                label: 'Setting',
                slug: 'save-reference/player/ugc/editor/setting',
              },
            ],
          },
          {
            label: 'Exterior',
            slug: 'save-reference/player/ugc/exterior',
          },
          {
            label: 'FacePaint',
            slug: 'save-reference/player/ugc/face-paint',
          },
          {
            label: 'Food',
            slug: 'save-reference/player/ugc/food',
          },
          {
            label: 'Goods',
            slug: 'save-reference/player/ugc/goods',
          },
          {
            label: 'Interior',
            slug: 'save-reference/player/ugc/interior',
          },
          {
            label: 'MapFloor',
            slug: 'save-reference/player/ugc/map-floor',
          },
          {
            label: 'MapObject',
            slug: 'save-reference/player/ugc/map-object',
          },
          {
            label: 'SuspendData',
            slug: 'save-reference/player/ugc/suspend-data',
          },
          {
            label: 'SuspendMii',
            slug: 'save-reference/player/ugc/suspend-mii',
          },
          {
            label: 'Text',
            collapsed: true,
            items: [
              {
                label: 'Overview',
                slug: 'save-reference/player/ugc/text',
              },
              {
                label: 'TextData',
                slug: 'save-reference/player/ugc/text/text-data',
              },
            ],
          },
        ],
      },
      {
        label: 'Unknown',
        slug: 'save-reference/player/unknown',
      },
      {
        label: 'Unlock',
        slug: 'save-reference/player/unlock',
      },
    ],
  },
  {
    label: 'Mii.sav',
    collapsed: true,
    items: [
      {
        label: 'Overview',
        slug: 'save-reference/mii',
      },
      {
        label: 'Childcare',
        collapsed: true,
        items: [
          {
            label: 'Overview',
            slug: 'save-reference/mii/childcare',
          },
          {
            label: 'Pending',
            collapsed: true,
            items: [
              {
                label: 'Overview',
                slug: 'save-reference/mii/childcare/pending',
              },
              {
                label: 'CharacterParam',
                slug: 'save-reference/mii/childcare/pending/character-param',
              },
              {
                label: 'HabitOwnInfo',
                slug: 'save-reference/mii/childcare/pending/habit-own-info',
              },
              {
                label: 'Name',
                slug: 'save-reference/mii/childcare/pending/name',
              },
              {
                label: 'Voice',
                slug: 'save-reference/mii/childcare/pending/voice',
              },
              {
                label: 'WordInfo',
                collapsed: true,
                items: [
                  {
                    label: 'Overview',
                    slug: 'save-reference/mii/childcare/pending/word-info',
                  },
                  {
                    label: 'WordArray',
                    slug: 'save-reference/mii/childcare/pending/word-info/word-array',
                  },
                ],
              },
            ],
          },
          {
            label: 'Reserve',
            slug: 'save-reference/mii/childcare/reserve',
          },
          {
            label: 'Setting',
            slug: 'save-reference/mii/childcare/setting',
          },
        ],
      },
      {
        label: 'Mii',
        collapsed: true,
        items: [
          {
            label: 'Overview',
            slug: 'save-reference/mii/mii',
          },
          {
            label: 'Belongings',
            collapsed: true,
            items: [
              {
                label: 'Overview',
                slug: 'save-reference/mii/mii/belongings',
              },
              {
                label: 'GoodsOwnInfoSlot',
                slug: 'save-reference/mii/mii/belongings/goods-own-info-slot',
              },
              {
                label: 'HabitOwnInfo',
                slug: 'save-reference/mii/mii/belongings/habit-own-info',
              },
              {
                label: 'RoomStyleInfo',
                collapsed: true,
                items: [
                  {
                    label: 'Overview',
                    slug: 'save-reference/mii/mii/belongings/room-style-info',
                  },
                  {
                    label: 'Flag',
                    slug: 'save-reference/mii/mii/belongings/room-style-info/flag',
                  },
                ],
              },
            ],
          },
          {
            label: 'CharacterParam',
            slug: 'save-reference/mii/mii/character-param',
          },
          {
            label: 'Feeling',
            slug: 'save-reference/mii/mii/feeling',
          },
          {
            label: 'HomeLiveTime',
            slug: 'save-reference/mii/mii/home-live-time',
          },
          {
            label: 'Location',
            slug: 'save-reference/mii/mii/location',
          },
          {
            label: 'MiiMisc',
            collapsed: true,
            items: [
              {
                label: 'Overview',
                slug: 'save-reference/mii/mii/mii-misc',
              },
              {
                label: 'BalloonTalkInfo',
                slug: 'save-reference/mii/mii/mii-misc/balloon-talk-info',
              },
              {
                label: 'BirthdayInfo',
                slug: 'save-reference/mii/mii/mii-misc/birthday-info',
              },
              {
                label: 'BondInfo',
                slug: 'save-reference/mii/mii/mii-misc/bond-info',
              },
              {
                label: 'ClothInfo',
                collapsed: true,
                items: [
                  {
                    label: 'Overview',
                    slug: 'save-reference/mii/mii/mii-misc/cloth-info',
                  },
                  {
                    label: 'Accessory',
                    slug: 'save-reference/mii/mii/mii-misc/cloth-info/accessory',
                  },
                  {
                    label: 'All',
                    slug: 'save-reference/mii/mii/mii-misc/cloth-info/all',
                  },
                  {
                    label: 'BottomsA',
                    slug: 'save-reference/mii/mii/mii-misc/cloth-info/bottoms-a',
                  },
                  {
                    label: 'BottomsB',
                    slug: 'save-reference/mii/mii/mii-misc/cloth-info/bottoms-b',
                  },
                  {
                    label: 'Coordinate',
                    slug: 'save-reference/mii/mii/mii-misc/cloth-info/coordinate',
                  },
                  {
                    label: 'Headwear',
                    slug: 'save-reference/mii/mii/mii-misc/cloth-info/headwear',
                  },
                  {
                    label: 'Shoes',
                    slug: 'save-reference/mii/mii/mii-misc/cloth-info/shoes',
                  },
                  {
                    label: 'Tops',
                    slug: 'save-reference/mii/mii/mii-misc/cloth-info/tops',
                  },
                  {
                    label: 'Topslong',
                    slug: 'save-reference/mii/mii/mii-misc/cloth-info/topslong',
                  },
                ],
              },
              {
                label: 'EatInfo',
                collapsed: true,
                items: [
                  {
                    label: 'Overview',
                    slug: 'save-reference/mii/mii/mii-misc/eat-info',
                  },
                  {
                    label: 'LastEatId',
                    slug: 'save-reference/mii/mii/mii-misc/eat-info/last-eat-id',
                  },
                  {
                    label: 'RankedFoodId',
                    slug: 'save-reference/mii/mii/mii-misc/eat-info/ranked-food-id',
                  },
                ],
              },
              {
                label: 'EntryInfo',
                slug: 'save-reference/mii/mii/mii-misc/entry-info',
              },
              {
                label: 'FaceInfo',
                slug: 'save-reference/mii/mii/mii-misc/face-info',
              },
              {
                label: 'PatInfo',
                slug: 'save-reference/mii/mii/mii-misc/pat-info',
              },
              {
                label: 'SatisfyInfo',
                slug: 'save-reference/mii/mii/mii-misc/satisfy-info',
              },
              {
                label: 'SleepInfo',
                slug: 'save-reference/mii/mii/mii-misc/sleep-info',
              },
              {
                label: 'UgcInfo',
                slug: 'save-reference/mii/mii/mii-misc/ugc-info',
              },
              {
                label: 'WordInfo',
                collapsed: true,
                items: [
                  {
                    label: 'Overview',
                    slug: 'save-reference/mii/mii/mii-misc/word-info',
                  },
                  {
                    label: 'WordArray',
                    slug: 'save-reference/mii/mii/mii-misc/word-info/word-array',
                  },
                ],
              },
            ],
          },
          {
            label: 'Name',
            slug: 'save-reference/mii/mii/name',
          },
          {
            label: 'Trouble',
            collapsed: true,
            items: [
              {
                label: 'Overview',
                slug: 'save-reference/mii/mii/trouble',
              },
              {
                label: 'Info',
                collapsed: true,
                items: [
                  {
                    label: 'Overview',
                    slug: 'save-reference/mii/mii/trouble/info',
                  },
                  {
                    label: 'TargetMapObject',
                    slug: 'save-reference/mii/mii/trouble/info/target-map-object',
                  },
                ],
              },
            ],
          },
          {
            label: 'Voice',
            slug: 'save-reference/mii/mii/voice',
          },
        ],
      },
      {
        label: 'Relation',
        collapsed: true,
        items: [
          {
            label: 'Overview',
            slug: 'save-reference/mii/relation',
          },
          {
            label: 'Info',
            collapsed: true,
            items: [
              {
                label: 'Overview',
                slug: 'save-reference/mii/relation/info',
              },
              {
                label: 'DirectionalInfo',
                slug: 'save-reference/mii/relation/info/directional-info',
              },
              {
                label: 'RelationId',
                slug: 'save-reference/mii/relation/info/relation-id',
              },
            ],
          },
        ],
      },
      {
        label: 'Unknown',
        slug: 'save-reference/mii/unknown',
      },
    ],
  },
  {
    label: 'Map.sav',
    collapsed: true,
    items: [
      {
        label: 'Overview',
        slug: 'save-reference/map',
      },
      {
        label: 'House',
        collapsed: true,
        items: [
          {
            label: 'Overview',
            slug: 'save-reference/map/house',
          },
          {
            label: 'OuterHouse',
            collapsed: true,
            items: [
              {
                label: 'Overview',
                slug: 'save-reference/map/house/outer-house',
              },
              {
                label: 'OuterHouseDeco',
                slug: 'save-reference/map/house/outer-house/outer-house-deco',
              },
            ],
          },
          {
            label: 'RoomSettings',
            slug: 'save-reference/map/house/room-settings',
          },
          {
            label: 'RoomStyleInfo',
            collapsed: true,
            items: [
              {
                label: 'Overview',
                slug: 'save-reference/map/house/room-style-info',
              },
              {
                label: 'Flag',
                slug: 'save-reference/map/house/room-style-info/flag',
              },
            ],
          },
        ],
      },
      {
        label: 'MapGrid',
        collapsed: true,
        items: [
          {
            label: 'Overview',
            slug: 'save-reference/map/map-grid',
          },
          {
            label: 'GridX',
            collapsed: true,
            items: [
              {
                label: 'Overview',
                slug: 'save-reference/map/map-grid/grid-x',
              },
              {
                label: 'GridZ',
                slug: 'save-reference/map/map-grid/grid-x/grid-z',
              },
            ],
          },
        ],
      },
      {
        label: 'MapObject',
        collapsed: true,
        items: [
          {
            label: 'Overview',
            slug: 'save-reference/map/map-object',
          },
          {
            label: 'Location',
            slug: 'save-reference/map/map-object/location',
          },
          {
            label: 'MapLink',
            slug: 'save-reference/map/map-object/map-link',
          },
          {
            label: 'MapObjectMisc',
            slug: 'save-reference/map/map-object/map-object-misc',
          },
          {
            label: 'UgcObje',
            slug: 'save-reference/map/map-object/ugc-obje',
          },
        ],
      },
      {
        label: 'Unknown',
        slug: 'save-reference/map/unknown',
      },
    ],
  },
];

export default sidebar;
