# I-ON demo

#### Author: Huy Nguyen

#### Tech stacks:

<ul>
  <li><strong>Framework/Libs:</strong> NextJs, ReactJs, React-DnD, React-Modal, zustand.</li>
  <li><strong>ORM:</strong> Prisma.</li>
  <li><strong>Database:</strong> PostgresSQL.</li>
  <li><strong>Cloud:</strong> Vercel.</li>
</ul>

#### Overview:

This project is developed on Next.js source code, encompassing both Front-End and Back-End, with the aim of creating a demo within a short timeframe. Given the limited duration, I utilized libraries within the React.js ecosystem to enhance work efficiency and stability. In summary, the project is a <strong><em>monolithic</em></strong> structure.

#### System Architecture:

![System Architecture](/docs/img_system_architecture.jpg)

#### Database Design:

![ERD](/docs/img_demo_erd.jpg)

>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The database is designed with the aim of allowing flexibility for its components. The idea is as follows: Users will edit the UI on an object called <u>Theme</u>, each <u>Theme</u> will have a list of <u>ThemeDetail</u>, within each <u>ThemeDetail</u> there will be a <u>LayoutType</u> (grid, flex, etc.) and a list of <u>Components</u>. For each <u>Component</u> object, there will be a <u>ComponentType</u> (button, paragraph), based on which the number and values of <u>Attributes</u> can be determined.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For example, a Button named ABC has a <u>ComponentType</u> is <em>button</em> and 2 attributes are <em>label</em> and <em>alert_text</em>. Based on the ID of the ABC component, the values of the 2 attributes label and alert_text can be determined.

#### Demo:

- <strong>Admin Page:</strong> [Link](https://ion-app-demo.vercel.app/admin)
- <strong>Anonymous User Page (Preview):</strong> [Link](https://ion-app-demo.vercel.app)

#### Demo Images:

![admin 1](/docs/img_demo_admin_1.png)

![admin 2](/docs/img_demo_admin_2.png)

![user 1](/docs/img_demo_user_1.png)
