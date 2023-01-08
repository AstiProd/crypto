using System.Security.Cryptography;
using System.Text;

namespace crypto
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        string hash = "Alex@ndr$";

        private void btnCrypt_Click(object sender, EventArgs e)
        {
            byte[] data = UTF8Encoding.UTF8.GetBytes(txtText.Text);
            using MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
            byte[] keys = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(hash));

            using (TripleDESCryptoServiceProvider tripDes = new TripleDESCryptoServiceProvider() { Key = keys, Mode = CipherMode.ECB, Padding = PaddingMode.PKCS7 })
            {
                ICryptoTransform transform = tripDes.CreateEncryptor();
                byte[] results = transform.TransformFinalBlock(data, 0, data.Length);
                txtCrypt.Text = Convert.ToBase64String(results, 0, results.Length);
            }
        }

        private void btnDecrypt_Click(object sender, EventArgs e)
        {
            byte[] data = Convert.FromBase64String(txtCrypt.Text);
            using (MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider()) 
            {
                byte[] keys = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(hash));

                using (TripleDESCryptoServiceProvider tripDes = new TripleDESCryptoServiceProvider() { Key = keys, Mode = CipherMode.ECB, Padding = PaddingMode.PKCS7 })
                {
                    ICryptoTransform transform = tripDes.CreateDecryptor();
                    byte[] results = transform.TransformFinalBlock(data, 0, data.Length);
                    txtDecrypt.Text = UTF8Encoding.UTF8.GetString(results);

                    //On va faire un c/c du cryptage et modifier la ligne  'byte[] data = UTF8Encoding.UTF8.GetBytes(txtText.Text)' en  byte[] data = Convert.FromBase64String(txtCrypt.Text);
                    // et  modifier la ligne ' txtCrypt.Text = Convert.ToBase64String(results, 0, results.Length);' en  txtDecrypt.Text = UTF8Encoding.UTF8.GetString(results);
                }
            }
        }
        public void CyptPerso(ref StringBuilder s, string key)
        {
            for (int i = 0; i < s.Length; i++) s[i] = char.ToUpper(s[i]);
            key = key.ToUpper();
            int j = 0;
            for (int i = 0; i < s.Length; i++)
            {
                if (char.IsLetter(s[i]))
                {
                    s[i] = (char)(s[i] + key[j] - 'A');
                    if (s[i] > 'Z') s[i] = (char)(s[i] - 'Z' + 'A' - 1);
                }
                j = j + 1 == key.Length ? 0 : j + 1;

            }
        }
         public void DecryptPerso(ref StringBuilder s, string key)
        {
            for (int i = 0; i < s.Length; i++)
                s[i] = Char.ToUpper(s[i]);
            key = key.ToUpper();
            int j = 0;
            for (int i = 0; i < s.Length; i++)
            {
                if (Char.IsLetter(s[i]))
                {
                    s[i] = s[i] >= key[j] ?
                        (char)(s[i] - key[j] + 'A') :
                        (char)('A' + ('Z' - key[j] + s[i] - 'A') + 1);
                }

                j = j + 1 == key.Length ? 0 : j + 1;
            }
        }
        private void btnCryptPerso_Click(object sender, EventArgs e)
        {
            StringBuilder s = new StringBuilder(txtTextPerso.Text);
            string key = txtKey.Text;
            CyptPerso(ref s, key);
            txtCryptPerso.Text = Convert.ToString(s);

        }

        private void btnDecryptPerso_Click(object sender, EventArgs e)
        {
            StringBuilder s = new StringBuilder(txtCryptPerso.Text);
            string key = txtKey.Text;
            DecryptPerso(ref s, key);
            txtDecryptPerso.Text = Convert.ToString(s);
        }

        private void sortirToolStripMenuItem_Click(object sender, EventArgs e)
        {
            
        }

        private void bastinAlexandre2023ToolStripMenuItem_Click(object sender, EventArgs e)
        {

        }

        private void sortirToolStripMenuItem1_Click(object sender, EventArgs e)
        {
             this.Close();
        }
    }
}
