import React from "react";

const UserForm = () => {
  return (
    <div className="w-full flex items-start flex-col bg-fifed p-6 gap-5">
      <div>
        <p className="text-large md:text-2xl font-bold">بيانات الشحن</p>
        <p className="text-large text-[#787878]">
          من فضلك املأ البيانات بطريقة صحيحة حتى يصل إليك الطلب بالعنوان الصحيح
        </p>
      </div>
      <div className="w-full flex gap-3">
        <input
          className="inputClass"
          placeholder="الاسم الأول"
          type="text"
        />
        <input
          className="inputClass"
          placeholder=" الاسم العائلة"
          type="text"
        />
      </div>
      <input
        placeholder="رقم الموبايل"
        className="inputClass"
        type="text"
        name=""
        id=""
      />
      <input
        placeholder="كلمة المرور"
        className="inputClass"
        type="text"
        name=""
        id=""
      />
      <input
        placeholder="تأكيد كلمة المرور"
        className="inputClass"
        type="text"
        name=""
        id=""
      />
      <div className="w-full flex gap-3">
        <input
          className="inputClass"
          placeholder="الاسم الأول"
          type="text"
        />
        <input
          className="inputClass"
          placeholder=" الاسم العائلة"
          type="text"
        />
      </div>
      <div className="w-full flex gap-3">
        <input
          className="inputClass"
          placeholder="الاسم الأول"
          type="text"
        />
        <input
          className="inputClass"
          placeholder=" الاسم العائلة"
          type="text"
        />
      </div>
      <input type="text" name="" id="" />
      <button className="w-full py-2 md:py-4 bg-primary rounded-lg text-white font-bold">
        حفظ{" "}
      </button>
    </div>
  );
};

export default UserForm;
