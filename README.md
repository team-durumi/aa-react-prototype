이 프로젝트는 알콜아카이브 개발을 위한 주요 기능의 프로토타입 개발 버젼이며, react를 활용하여 개발하였습니다.

## 주요기능

단일 컬렉션 뷰 페이지로써, json형식의 데이터에 기술된 아이템목록에 따라, 웹페이지에 렌더링해 줍니다.

## Json데이터

### 포멧
<pre>
<code>
[
  {
    "type": "컬렉션타입",
    "name": "아이템명",
    "props": { 
      아이템의 속성들...
    }
  },
  {}.....
]
</code>
</pre>
<br /><br />

### 본 프로젝트에 사용된 더미 Json
./public/dummy/Collection.json<br />

<pre>
<code>
[
  {
    "type": "Tblog",
    "name": "Mheader",
    "props": { 
      "category": "카테고리",
      "title": "타이틀 타이틀",
      "content": "써머리가 들어갑니다.333"      
    }
  },
  {
    "type": "Tblog",
    "name": "MsingleHor",
    "props": { 
      "image": "https://cdn.pixabay.com/photo/2015/06/19/17/58/sample-815141_960_720.jpg",
      "title": "블로그 싱글아이템 가로형",
      "content": "써머리가 많이 들어갑니다.777써머리가 많이 들어갑니다.777써머리가 많이 들어갑니다.777"      
    }
  },
  {
    "type": "Tcommon",
    "name": "Mtextarea",
    "props": { 
      "content": "본문 내용입니다.본문 내용입니다.본문 내용입니다.본문 내용입니다.<br/>본문 내용입니다.본문 내용입니다.본문 내용입니다.본문 내용입니다.본문 내용입니다.본문 내용입니다.본문 내용입니다.본문 내용입니다. 본문 내용입니다.본문 내용입니다.본문 내용입니다.<br/>본문 내용입니다.본문 내용입니다.본문 내용입니다.본문 내용입니다.본문 내용입니다.본문 내용입니다.본문 내용입니다.본문 내용입니다. 본문 내용입니다.본문 내용입니다.본문 내용입니다.<br/>본문 내용입니다.본문 내용입니다.본문 내용입니다.본문 내용입니다.본문 내용입니다.본문 내용입니다.본문 내용입니다.본문 내용입니다. 본문 내용입니다.본문 내용입니다.본문 내용입니다. "      
    }
  },
  {
    "type": "Tcommon",
    "name": "Mbutton",
    "props": { 
      "href": "http://google.com",
      "text": "자세히 보기"      
    }
  },
  {
    "type": "Tblog",
    "name": "MsingleCrop",
    "props": { 
      "image": "http://topclass.chosun.com/news_img/1701/1701_078.jpg",
      "title": "블로그 싱글아이템 크롭형",
      "content": "블로그 싱글아이템 크롭형블로그 싱글아이템 크롭형블로그 싱글아이템 크롭형블로그 싱글아이템 크롭형블로그 싱글아이템 크롭형블로그 싱글아이템 크롭형블로그 싱글아이템 크롭형"      
    }
  },
  {
    "type": "Tblog",
    "name": "MdoubleCrop",
    "props": { 
      "childs":[
        {
          "image": "http://topclass.chosun.com/news_img/1701/1701_078.jpg",
          "title": "블로그 더블아이템  크롭형",
          "content": "메타데이터1메타데이터1 메타데이터3메타데이터1메타데이터1 메타데이터3메타데이터1메타데이터1 메타데이터3 "
        },
        {
          "image": "http://topclass.chosun.com/news_img/1701/1701_078.jpg",
          "title": "블로그 더블아이템  크롭형",
          "content": "메타데이터1메타데이터1메타데이터3"
        }
      ]
     }
  }
]
</code>
</pre>
## 주요 디렉토리/파일 구조

### src/layouts

웹페이지 UI의 레이아웃 콤포넌트들

### src/views

레이아웃의 Contents 영역에 렌더링 될 뷰페이지들(아이템 콤포넌트의 컨테이너 역할)


### src/components

view에서 비동기적으로 로드하여 렌더링하는 아카이브 아이템 단위의 콤포넌트들


