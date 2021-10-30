document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('form-submit');
  const test = document.getElementById('package.one.btn');
  const test2 = document.getElementById('package.two.btn');
  const test3 = document.getElementById('package.three.btn');
  const close = document.getElementById('close');
  const name = document.getElementById('name');
  const subject = document.getElementById('subject');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  let packageName = '';

  if (test) {
    test.addEventListener('click', (e) => {
      const modal = document.getElementById('modal-container');

      if (modal) {
        packageName = 'Website and Web Applications';
        modal.classList.remove('hidden');
      }
    });
  }
  if (test2) {
    test2.addEventListener('click', (e) => {
      const modal = document.getElementById('modal-container');

      if (modal) {
        packageName = 'Mobile Applications';
        modal.classList.remove('hidden');
      }
    });
  }
  if (test3) {
    test3.addEventListener('click', (e) => {
      const modal = document.getElementById('modal-container');

      if (modal) {
        packageName = 'Mobile app + Website';
        modal.classList.remove('hidden');
      }
    });
  }

  if (close) {
    close.addEventListener('click', (e) => {
      const modal = document.getElementById('modal-container');
      if (modal) {
        modal.classList.add('hidden');
        name.value = '';
        email.value = '';
        phone.value = '';
        subject.value = '';
        packageName = '';
      }
    });
  }

  if (btn) {
    btn.addEventListener('click', async (e) => {
      let error = false;
      console.log(packageName);

      const formError = document.getElementById('form-error');
      let data = {
        name: '',
        subject: '',
        email: '',
        phone: '',
      };

      if (name && name.value === '') {
        error = true;
      } else {
        data.name = name.value;
      }

      if (subject && subject.value === '') {
        error = true;
      } else {
        data.subject = subject.value;
      }

      if (email && email.value === '') {
        error = true;
      } else {
        data.email = email.value;
      }

      if (phone && phone.value === '') {
        error = true;
      } else {
        data.phone = phone.value;
      }

      if (error && formError) {
        formError.classList.remove('hidden');
        setTimeout(() => {
          if (!formError.classList.contains('hidden')) {
            formError.classList.add('hidden');
          }
        }, 3000);
      } else {
        formError.classList.add('hidden');
        console.log('submit : ');
        console.log(data);

        const sendData = {
          form_package: packageName,
          from_name: data.name,
          from_email: data.email,
          from_phone: data.phone,
          from_subject: data.subject,
          from_description: data.subject,
        };

        name.value = '';
        email.value = '';
        phone.value = '';
        subject.value = '';

        emailjs.send('service_2i39tk3', 'template_sft1fpl', sendData).then((res) => {
          console.log('send');
        });
      }
    });
  }
});
