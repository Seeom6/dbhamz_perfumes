import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[1260px] w-full px-2.5 flex flex-col justify-center gap-8 sm:gap-14 md:gap-20 mb-20 text-small md:text-large text-ford">
        <div >
          <h3 className="font-semibold text-sm md:text-xl text-black">جميع العطور المتوفرة هي تستر بمعنى اخر بدون كرتون </h3>
          <p>
            جديدة بدون استعمال يوجد لدينا ضمان 48 ساعة لاسترجاع او استبدال
            العطور يوجد لدينا خدمة عملاء ممتازة و سريعة جداً للتعاون مع العميل
            اذا كان هنالك اي اضرار في الشحنات اي ضرر في الشحنات نحن من نقوم
            بتحمل المسؤلية من وقت الطلب حتى وقت الاستلام نقوم بأستبدال العطور او
            استرجاعها في مدة اقصاها 24 ساعة في جميع الدول يمكن لاي عميل الغاء
            الطلب خلال مدة اقصاها 8 ساعات
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-sm md:text-xl text-black">الشحن سيكون عبر شركة ارامكس : </h3>
          <p>
            {" "}
            يستغرق الشحن مدة اقصاها 4 ايام و اقلها 3 ايام و حيث يمكن للعميل
            التواصل مع موضف خدمة العملاء و مندوب المبيعات عبر واتساب
            للاستفسار عن اي شيء
          </p>
        </div>
        <div>
            <h3 className="font-semibold text-sm md:text-xl text-black">الاسترجاع او الاستبدال : </h3>
            <p>للاسترجاع يتم خصم 2،80‎%‎ من المبلغ المدفوع لشركة المدفوعات فقط 
            و للاستبدال يتم استبدال العطر مجاناً</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
