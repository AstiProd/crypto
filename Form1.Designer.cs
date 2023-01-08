namespace crypto
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.label1 = new System.Windows.Forms.Label();
            this.txtText = new System.Windows.Forms.TextBox();
            this.btnCrypt = new System.Windows.Forms.Button();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.txtCrypt = new System.Windows.Forms.TextBox();
            this.txtDecrypt = new System.Windows.Forms.TextBox();
            this.btnDecrypt = new System.Windows.Forms.Button();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.btnDecryptPerso = new System.Windows.Forms.Button();
            this.txtDecryptPerso = new System.Windows.Forms.TextBox();
            this.txtCryptPerso = new System.Windows.Forms.TextBox();
            this.label6 = new System.Windows.Forms.Label();
            this.label7 = new System.Windows.Forms.Label();
            this.btnCryptPerso = new System.Windows.Forms.Button();
            this.txtTextPerso = new System.Windows.Forms.TextBox();
            this.label8 = new System.Windows.Forms.Label();
            this.txtKey = new System.Windows.Forms.TextBox();
            this.label9 = new System.Windows.Forms.Label();
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.cryptageDecryptageToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.sortirToolStripMenuItem1 = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripMenuItem3 = new System.Windows.Forms.ToolStripMenuItem();
            this.bastinAlexandre2023ToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.menuStrip1.SuspendLayout();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(30, 103);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(34, 15);
            this.label1.TabIndex = 0;
            this.label1.Text = "Texte";
            // 
            // txtText
            // 
            this.txtText.Location = new System.Drawing.Point(104, 95);
            this.txtText.Name = "txtText";
            this.txtText.Size = new System.Drawing.Size(222, 23);
            this.txtText.TabIndex = 1;
            // 
            // btnCrypt
            // 
            this.btnCrypt.Location = new System.Drawing.Point(379, 149);
            this.btnCrypt.Name = "btnCrypt";
            this.btnCrypt.Size = new System.Drawing.Size(75, 23);
            this.btnCrypt.TabIndex = 2;
            this.btnCrypt.Text = "Crypter";
            this.btnCrypt.UseVisualStyleBackColor = true;
            this.btnCrypt.Click += new System.EventHandler(this.btnCrypt_Click);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(30, 149);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(46, 15);
            this.label2.TabIndex = 3;
            this.label2.Text = "Crypter";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(30, 196);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(58, 15);
            this.label3.TabIndex = 4;
            this.label3.Text = "Decrypter";
            // 
            // txtCrypt
            // 
            this.txtCrypt.Location = new System.Drawing.Point(104, 146);
            this.txtCrypt.Name = "txtCrypt";
            this.txtCrypt.Size = new System.Drawing.Size(222, 23);
            this.txtCrypt.TabIndex = 5;
            // 
            // txtDecrypt
            // 
            this.txtDecrypt.Location = new System.Drawing.Point(104, 188);
            this.txtDecrypt.Name = "txtDecrypt";
            this.txtDecrypt.Size = new System.Drawing.Size(222, 23);
            this.txtDecrypt.TabIndex = 6;
            // 
            // btnDecrypt
            // 
            this.btnDecrypt.Location = new System.Drawing.Point(379, 192);
            this.btnDecrypt.Name = "btnDecrypt";
            this.btnDecrypt.Size = new System.Drawing.Size(75, 23);
            this.btnDecrypt.TabIndex = 7;
            this.btnDecrypt.Text = "Decrypter";
            this.btnDecrypt.UseVisualStyleBackColor = true;
            this.btnDecrypt.Click += new System.EventHandler(this.btnDecrypt_Click);
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("Yu Gothic UI", 12F, ((System.Drawing.FontStyle)((System.Drawing.FontStyle.Bold | System.Drawing.FontStyle.Underline))), System.Drawing.GraphicsUnit.Point);
            this.label4.ForeColor = System.Drawing.SystemColors.ControlText;
            this.label4.Location = new System.Drawing.Point(30, 62);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(235, 21);
            this.label4.TabIndex = 8;
            this.label4.Text = "MD5 CRYPTAGE / DECRYPTAGE";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Font = new System.Drawing.Font("Yu Gothic UI", 12F, ((System.Drawing.FontStyle)((System.Drawing.FontStyle.Bold | System.Drawing.FontStyle.Underline))), System.Drawing.GraphicsUnit.Point);
            this.label5.ForeColor = System.Drawing.SystemColors.ControlText;
            this.label5.Location = new System.Drawing.Point(30, 254);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(248, 21);
            this.label5.TabIndex = 9;
            this.label5.Text = "PERSO CRYPTAGE / DECRYPTAGE";
            // 
            // btnDecryptPerso
            // 
            this.btnDecryptPerso.Location = new System.Drawing.Point(379, 399);
            this.btnDecryptPerso.Name = "btnDecryptPerso";
            this.btnDecryptPerso.Size = new System.Drawing.Size(75, 23);
            this.btnDecryptPerso.TabIndex = 17;
            this.btnDecryptPerso.Text = "Decrypter";
            this.btnDecryptPerso.UseVisualStyleBackColor = true;
            this.btnDecryptPerso.Click += new System.EventHandler(this.btnDecryptPerso_Click);
            // 
            // txtDecryptPerso
            // 
            this.txtDecryptPerso.Location = new System.Drawing.Point(104, 395);
            this.txtDecryptPerso.Name = "txtDecryptPerso";
            this.txtDecryptPerso.Size = new System.Drawing.Size(222, 23);
            this.txtDecryptPerso.TabIndex = 16;
            // 
            // txtCryptPerso
            // 
            this.txtCryptPerso.Location = new System.Drawing.Point(104, 353);
            this.txtCryptPerso.Name = "txtCryptPerso";
            this.txtCryptPerso.Size = new System.Drawing.Size(222, 23);
            this.txtCryptPerso.TabIndex = 15;
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(30, 403);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(58, 15);
            this.label6.TabIndex = 14;
            this.label6.Text = "Decrypter";
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Location = new System.Drawing.Point(30, 356);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(46, 15);
            this.label7.TabIndex = 13;
            this.label7.Text = "Crypter";
            // 
            // btnCryptPerso
            // 
            this.btnCryptPerso.Location = new System.Drawing.Point(379, 356);
            this.btnCryptPerso.Name = "btnCryptPerso";
            this.btnCryptPerso.Size = new System.Drawing.Size(75, 23);
            this.btnCryptPerso.TabIndex = 12;
            this.btnCryptPerso.Text = "Crypter";
            this.btnCryptPerso.UseVisualStyleBackColor = true;
            this.btnCryptPerso.Click += new System.EventHandler(this.btnCryptPerso_Click);
            // 
            // txtTextPerso
            // 
            this.txtTextPerso.Location = new System.Drawing.Point(104, 302);
            this.txtTextPerso.Name = "txtTextPerso";
            this.txtTextPerso.Size = new System.Drawing.Size(222, 23);
            this.txtTextPerso.TabIndex = 11;
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Location = new System.Drawing.Point(30, 310);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(34, 15);
            this.label8.TabIndex = 10;
            this.label8.Text = "Texte";
            // 
            // txtKey
            // 
            this.txtKey.Location = new System.Drawing.Point(104, 439);
            this.txtKey.Name = "txtKey";
            this.txtKey.Size = new System.Drawing.Size(222, 23);
            this.txtKey.TabIndex = 19;
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Location = new System.Drawing.Point(30, 447);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(24, 15);
            this.label9.TabIndex = 18;
            this.label9.Text = "Clé";
            // 
            // menuStrip1
            // 
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.cryptageDecryptageToolStripMenuItem});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(818, 24);
            this.menuStrip1.TabIndex = 20;
            this.menuStrip1.Text = "Cryptage APP";
            // 
            // cryptageDecryptageToolStripMenuItem
            // 
            this.cryptageDecryptageToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.sortirToolStripMenuItem1,
            this.toolStripMenuItem3,
            this.bastinAlexandre2023ToolStripMenuItem});
            this.cryptageDecryptageToolStripMenuItem.Name = "cryptageDecryptageToolStripMenuItem";
            this.cryptageDecryptageToolStripMenuItem.Size = new System.Drawing.Size(138, 20);
            this.cryptageDecryptageToolStripMenuItem.Text = "Cryptage / Decryptage";
            // 
            // sortirToolStripMenuItem1
            // 
            this.sortirToolStripMenuItem1.Name = "sortirToolStripMenuItem1";
            this.sortirToolStripMenuItem1.Size = new System.Drawing.Size(206, 22);
            this.sortirToolStripMenuItem1.Text = "Sortir";
            this.sortirToolStripMenuItem1.Click += new System.EventHandler(this.sortirToolStripMenuItem1_Click);
            // 
            // toolStripMenuItem3
            // 
            this.toolStripMenuItem3.Name = "toolStripMenuItem3";
            this.toolStripMenuItem3.Size = new System.Drawing.Size(206, 22);
            this.toolStripMenuItem3.Text = "________________________";
            // 
            // bastinAlexandre2023ToolStripMenuItem
            // 
            this.bastinAlexandre2023ToolStripMenuItem.Name = "bastinAlexandre2023ToolStripMenuItem";
            this.bastinAlexandre2023ToolStripMenuItem.Size = new System.Drawing.Size(206, 22);
            this.bastinAlexandre2023ToolStripMenuItem.Text = " © Bastin Alexandre 2023";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("$this.BackgroundImage")));
            this.ClientSize = new System.Drawing.Size(818, 502);
            this.Controls.Add(this.menuStrip1);
            this.Controls.Add(this.txtKey);
            this.Controls.Add(this.label9);
            this.Controls.Add(this.btnDecryptPerso);
            this.Controls.Add(this.txtDecryptPerso);
            this.Controls.Add(this.txtCryptPerso);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.label7);
            this.Controls.Add(this.btnCryptPerso);
            this.Controls.Add(this.txtTextPerso);
            this.Controls.Add(this.label8);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.btnDecrypt);
            this.Controls.Add(this.txtDecrypt);
            this.Controls.Add(this.txtCrypt);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.btnCrypt);
            this.Controls.Add(this.txtText);
            this.Controls.Add(this.label1);
            this.MainMenuStrip = this.menuStrip1;
            this.Name = "Form1";
            this.Text = "CRYPTAGE / DECRYPTAGE BASTIN ALEXANDRE";
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Label label1;
        private TextBox txtText;
        private Button btnCrypt;
        private Label label2;
        private Label label3;
        private TextBox txtCrypt;
        private TextBox txtDecrypt;
        private Button btnDecrypt;
        private Label label4;
        private Label label5;
        private Button btnDecryptPerso;
        private TextBox txtDecryptPerso;
        private TextBox txtCryptPerso;
        private Label label6;
        private Label label7;
        private Button btnCryptPerso;
        private TextBox txtTextPerso;
        private Label label8;
        private TextBox txtKey;
        private Label label9;
        private MenuStrip menuStrip1;
        private ToolStripMenuItem cryptageDecryptageToolStripMenuItem;
        private ToolStripMenuItem sortirToolStripMenuItem1;
        private ToolStripMenuItem toolStripMenuItem3;
        private ToolStripMenuItem bastinAlexandre2023ToolStripMenuItem;
    }
}