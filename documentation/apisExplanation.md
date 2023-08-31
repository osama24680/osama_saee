<!-- cSpell:ignore pgcontentpages ,pgarticles, pgarticlecategories, pgenquiry, pgenquiries -->

# Links:

## - [Selsal in Postman](https://documenter.getpostman.com/view/6754270/TWDdiZB8).

## - [Selsal Dashboard](https://saeeadmin.slsal.co). ask your team lead for credentials.

## - [baseurl](https://api.saee.org.sa)

---

---

# Intro:

## In this project we have list of pages types:

## 1- Home page ( \_\_\_ ). [example](./imgs/Home.png)

## 2- Normal content page ( staticPage or pgcontentpages ). [example](./imgs/static-page.png)

## 3- List page:

- this type of pages has many views and many back-end keys as following:

## - Three views: [Grid](./imgs/list-grid.png), [Lines](./imgs/list-lines.png), [Lines with categories](./imgs/list-lines-with-filter.png)

## - Back-end keys:

- pgarticles.
- pgarticlecategories.
- course/sections.
- course/modules [ Do we have else???????????? ].

## 4- Dynamic content page of a single item from the previous lists ( single dynamic page or ( \_\_\_ ) ). [example](./imgs/single-dynamic-page.png)

## 5- Forms ( pgenquiry ). [example Not available for now](#)

<br>

# And we will discuss the five type in the -Details- section below.

---

---

# General Rules:

### - Here we discuss the variables that you will use in the - [Details](#) - section below.

## 1- You can get the proper value of the following parameters from [Selsal Dashboard](https://saeeadmin.slsal.co), click on its arabic name and it will appear in the URL:

- page_name.

- type.

## 2 - Variables in each api link:

- number_of_items_per_page = +ve integer.

- page_number = from 1 to the last page number.

- increment_number_of_views = 1 ==> true.

- increment_number_of_views = 0 ==> false.

- get_main_page_only = 1 ==> true.

- get_main_page_only = 0 ==> false.

- load_attachments = 1 ==> true.

- load_attachments = 0 ==> false.

- load_sections = 1 ==> ?????????
- load_sections = 0 ==> ?????????

---

---

# [Details](#):

## 2- Normal content page ( staticPage or pgcontentpages ).

### - show all:

- {{ base_url }}/pgcontentpages/{{ number_of_items_per_page }}
- {{ base_url }}/pgcontentpages/1000

### - show by name:

- {{ base_url }}/pgcontentpages/showbyname/{{ page_name }}/{{ increment_number_of_views }}
- {{ base_url }}/pgcontentpages/showbyname/about_us/1

## 3- List page [view: Grid or Lines] with optional left filter ( dynamic page or ( pgarticles, pgarticlecategories, course/sections, course/modules) ).

### - show all:

- news:

  - {{ base_url }}/pgarticles/{{ type }}/{{ get_main_page_only }}/{{ number_of_items_per_page }}?page={{ page_number }}
  - {{ base_url }}/pgarticles/news/0/10?page=1

- magazines:

  - {{ base_url }}/pgarticlecategories/{{ type }}/{{ get_main_page_only }}/{{ number_of_items_per_page }}
  - {{ base_url }}/pgarticlecategories/magazines/0/10

- books:

  - {{ base_url }}/course/sections/{{ type }}/{{ number_of_items_per_page }}
  - {{ base_url }}/course/sections/books/1000
  - {{ base_url }}/course/modules/{{ type }}/{{number_of_items_per_page}}
  - {{ base_url }}/course/modules/books/1000

- versions:

  - {{ base_url }}/lessons/versions/{{ number_of_items_per_page }}?loadSections={{ load_sections }}&loadAttachments={{ load_attachments }}&page={{ page_number }}
  - {{ base_url }}/lessons/versions/1000?loadSections=1&loadAttachments=0&page=1

- categories of versions(for filtration):

  - {{ base_url }}/course/sections/versions/{{ number_of_items_per_page }}
  - {{ base_url }}/course/sections/versions/500

- versions of a section:

  - {{ base_url }}/course/sections/versions/many_lessons/{{ section_id }}/{{ number_of_items_per_page }}?loadSections={{ load_sections }}&loadAttachments={{ load_attachments }}&page={{ page_number }}
  - {{ base_url }}/course/sections/versions/many_lessons/8b6a32c7-95a5-4382-98c7-0f1b6c921c2f/18?loadSections=0&loadAttachments=0&page=1

## 4- Dynamic content page of a single item in the previous point ( single dynamic page or ( same naming as the previous point ) ).

- single **\_\_**:

  - {{base_url}}/pgarticles/articles/show/{{ id }}/{{ increment_number_of_views }}
  - {{base_url}}/pgarticles/articles/show/41e635f9-483c-4126-a6c5-14da443f550c/0

- single version:

  - {{base_url}}/lessons/versions/show/{{ id }}/{{ unknown_variable }}/{{ unknown_variable }}?loadSections={{ load_sections }}&loadAttachments={{ load_attachments }}
  - {{base_url}}/lessons/versions/show/8737c332-287b-4cdd-9d56-1f9bd12bff4a/1/0?loadSections=1&loadAttachments=1

## 5- Forms ( pgenquiry ). - still needs more explanation -

- {{ base_url }}pgenquiries/{{ type }}/create?{{ parameter_name }}=test message&&&& ???????????

parameter name get from form in admin name field !!!!!!!!!!!!!!!!!!!!!!!!
